import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { env } from '../utils/config/env';
import { db } from '../utils/functions/db';
import { ForbiddenError, UserInputError } from '../utils/functions/errors';
import { LogInActivity, SignInResponse, UserInDb } from '../utils/types/generated';
import User, { TokenResponse } from './user.model';

interface AuthConfig {
  expiresIn?: string;
}

const loginActivityCollection = db.collection<LogInActivity>(env.LOGIN_ACTIVITY_COLLECTION);

/**
 * Sign a token
 * @param user - user that needs to be signed
 * @param config - configuration for the token
 * @returns signed token
 */
const sign = (
  user: Pick<
    UserInDb,
    '_id' | 'phoneNumber' | 'firstName' | 'lastName' | 'userName' | 'firebaseUserId' | 'profileImage'
  >,
  config?: AuthConfig
) => {
  const token = jwt.sign(
    {
      ...user,
    } satisfies Omit<TokenResponse, 'iat' | 'exp'>,
    env.JWT_SECRET,
    { expiresIn: config?.expiresIn || '6h' }
  );

  return token;
};

/**
 * Save the activity of the login
 * @param userId - id of the user
 */
const updateUserLoginRecordInActivity = async (userId: string) => {
  await loginActivityCollection.insertOne({
    _id: new ObjectId().toString(),
    timestamp: new Date(),
    userId,
  });
};

/**
 * Log a user in
 *
 * @param user - user that needs to be logged in
 */
const login = async (user: UserInDb) => {
  const token = sign(user);
  const refreshToken = sign(user, { expiresIn: '3d' });

  // update the login activity
  await updateUserLoginRecordInActivity(user._id);

  return {
    status: 'SUCCESS',
    token,
    refreshToken,
  } satisfies SignInResponse;
};

/**
 * Log a user in
 *
 * @param _id - _id of the user
 * @param token - token of the user
 */
const loginHistory = async (userId: string, token: TokenResponse | null, latest?: boolean) => {
  if (!token || token._id !== userId) return [];

  if (latest) {
    const history = await loginActivityCollection.find({ userId }).limit(1).sort({ createdAt: -1 }).toArray();

    return history;
  }

  const history = await loginActivityCollection.find({ userId }).toArray();

  return history;
};

/**
 * Refresh a token
 * @param refresh - refresh token
 * @returns new token
 */
const refreshToken = async (refresh: string) => {
  const existingRefreshToken = User.authenticate(refresh);

  if (!existingRefreshToken) throw new ForbiddenError('Invalid refresh token');

  const user = await User.findOne({ _id: existingRefreshToken._id });
  if (!user) throw new UserInputError('User not found');

  const userForToken = { ...user };

  const freshToken = sign(userForToken);
  const freshRefreshToken = sign(userForToken, { expiresIn: '3d' });

  // update the login history
  await updateUserLoginRecordInActivity(userForToken._id);

  return {
    status: 'SUCCESS',
    token: freshToken,
    refreshToken: freshRefreshToken,
  } satisfies SignInResponse;
};

const Authentication = {
  login,
  loginHistory,
  refreshToken,
};

export default Authentication;
