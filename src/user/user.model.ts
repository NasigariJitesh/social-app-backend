import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Filter, ObjectId } from 'mongodb';

import { env } from '../utils/config/env';
import { db } from '../utils/functions/db';
import { ApolloError, ForbiddenError, UserInputError } from '../utils/functions/errors';
import {
  SignInInput,
  SignInInputSchema,
  SignUpInput,
  SignUpInputSchema,
  UpdatePasswordInput,
  UpdatePasswordInputSchema,
  UserInDb,
  UserQueryArgs,
} from '../utils/types/generated';
import Authentication from './authentication.model';

export interface TokenResponse
  extends Pick<
    UserInDb,
    '_id' | 'phoneNumber' | 'firstName' | 'lastName' | 'userName' | 'firebaseUserId' | 'profileImage'
  > {
  iat: number;
  exp: number;
}

const SALT_ROUNDS = 10;

const userCollection = db.collection<UserInDb>(env.USER_COLLECTION);

/**
 * Sanitize the user value by removing the password from the object
 * @param input - UserInDb object
 * @returns same object but without password field
 */
const sanitize = (input: UserInDb) => {
  const result = { ...input };

  // @ts-expect-error REASON: As this property is non optional
  if (result.password) delete result.password;

  return result;
};

/**
 * Converts phone number stored in the database into PhoneNumber object
 * @param input - UserInDb object
 * @returns object but with serialized phone number type
 */
const serializeInput = (user: UserInDb) => {
  if (typeof user.phoneNumber === 'string')
    return {
      ...user,
      phoneNumber: parsePhoneNumber(user.phoneNumber),
    };

  return user;
};

/**
 * Converts PhoneNumber object to a string
 * @param input - UserInDb object
 * @returns object but with deserialized phone number type
 */
const deserializeInput = (user: UserInDb): UserInDb => {
  if (typeof user.phoneNumber === 'object')
    return {
      ...user,
      phoneNumber: user.phoneNumber?.format('E.164') as never,
    };

  return user;
};

/**
 * Update password of a user in the database
 * @param _id - _id of the user
 * @param userInput  - inputs containing old and new passwords
 */
const updatePassword = async (_id: string, userInput: UpdatePasswordInput) => {
  const input = UpdatePasswordInputSchema().parse(userInput);

  // Check if the user exists
  const user = await userCollection.findOne({ _id });
  if (!user) throw new UserInputError('User not found');

  let newPassword = '';

  // if there was a password available before
  if (user.password) {
    if (!input.oldPassword) throw new UserInputError('Current Password Invalid');

    // check if the old password is correct
    const isPasswordCorrect = await comparePassword(input.oldPassword, user.password);

    if (!isPasswordCorrect) throw new ForbiddenError('Incorrect password');

    if (input.newPassword === input.oldPassword)
      throw new ForbiddenError('New password cannot be same as old password');
  }

  newPassword = await hashPassword(input.newPassword);

  const updatedUser = await userCollection.findOneAndUpdate(
    { _id },
    {
      $set: {
        password: newPassword,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  if (updatedUser.ok !== 1 || !updatedUser.value) throw new ApolloError('Error updating password');

  return updatedUser.value satisfies UserInDb;
};

/**
 * Find one record matching the condition specified in the where clause
 * @param where - object containing filters
 * @returns - user object matching the condition, null otherwise
 */
const findOne = async (where: UserQueryArgs) => {
  let query: Filter<UserInDb> = {};

  if (where.phoneNumber) query = { ...query, phoneNumber: where.phoneNumber.format('E.164') as never };
  if (where._id) query = { ...query, _id: where._id };
  if (where.userName) query = { ...query, userName: where.userName };
  if (where.firebaseUserId) query = { ...query, firebaseUserId: where.firebaseUserId };

  // return null if empty query object is provided
  if (Object.keys(query).length === 0) return null;
  const user = await userCollection.findOne(query);

  if (user) return serializeInput(sanitize(user));

  return null;
};

/**
 * Hash a password if it exists
 * @param password - password that needs to be hashed
 * @returns hashed version of password
 */
const hashPassword = async (password: string) => {
  if (!password) throw new UserInputError('Password field is empty');

  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare the original password with the hash to see if they match
 * @param password - password that needs to be compared
 * @param hash - hashed password
 * @returns true if they match, false otherwise
 */
const comparePassword = async (password: string, hash: string) => {
  if (!password || !hash) throw new UserInputError('Password field is empty');

  return bcrypt.compare(password, hash);
};

/**
 * Authenticate a user based on token
 * @param token - token that needs to be verified
 * @returns decoded token if it is valid, null otherwise
 */
const authenticate = (token: string) => {
  try {
    const authToken = token.split(' ')[1];

    const response = jwt.verify(authToken, env.JWT_SECRET) as TokenResponse;

    return response;
  } catch {
    return null;
  }
};

/**
 * Sign the user into app
 * @param signInInput - input provided for sign in
 * @returns
 */
const signIn = async (signInInput: SignInInput) => {
  const input = SignInInputSchema().parse(signInInput);

  const user = await findOne({ userName: input.userName });
  if (!user) throw new UserInputError('User not found');

  // check if the user even has a password field
  if (!user.password) throw new ForbiddenError('No Password found for this user. Update the password first');

  // check if the password is correct
  const isPasswordCorrect = await comparePassword(input.password, user.password);
  if (!isPasswordCorrect) throw new UserInputError('Incorrect password');

  return Authentication.login(user);
};

/**
 * Sign up the user to app
 * @param signUpInput - input provided for sign in
 * @returns
 */
const signUp = async (signUpInput: SignUpInput) => {
  const input = SignUpInputSchema().parse(signUpInput);

  const user = await findOne({ userName: input.userName });
  if (user) throw new UserInputError('User with same username already exists');

  const hashedPassword = await hashPassword(input.password);

  const userInDb = {
    ...input,
    password: hashedPassword,
    _id: new ObjectId().toString(),
    createdAt: new Date(),
    dateOfBirth: new Date(input.dateOfBirth),
    verification: {
      phoneNumber: !!input.firebaseUserId,
    },
  };

  await userCollection.insertOne(deserializeInput(userInDb));
};

const verifyPhoneNumber = async (_id: string) => {
  const user = await userCollection.findOneAndUpdate(
    {
      _id,
    },
    {
      'verification.phoneNumber': true,
    },
    {
      returnDocument: 'after',
    }
  );

  if (!user.value) throw new UserInputError('User does not exist');

  return serializeInput(sanitize(user.value));
};

const User = {
  authenticate,
  signIn,
  signUp,
  updatePassword,
  verifyPhoneNumber,
  findOne,
};

export default User;
