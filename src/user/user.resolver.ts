import { errorLogger } from '../utils/functions/logger';
import { Context } from '../utils/types/context';
import { Maybe, Resolvers, UserInDb, UserResolvers } from '../utils/types/generated';
import Authentication from './authentication.model';
import User from './user.model';

type ExtendedResolvers = Resolvers & {
  User?: UserResolvers<Context> & {
    // eslint-disable-next-line no-unused-vars
    __resolveReference: (reference: { _id: string }, context: Context) => Promise<Maybe<UserInDb>> | Maybe<UserInDb>;
  };
};

export const resolver: ExtendedResolvers = {
  User: {
    __resolveReference(reference) {
      return User.findOne(reference);
    },
    loginHistory: async (parent, args, context) => {
      try {
        const loginHistory = await Authentication.loginHistory(parent._id, context.user);

        return loginHistory;
      } catch (error) {
        throw errorLogger(error);
      }
    },
    lastLogin: async (parent, args, context) => {
      try {
        const loginHistory = await Authentication.loginHistory(parent._id, context.user);

        return loginHistory[0];
      } catch (error) {
        throw errorLogger(error);
      }
    },
  },
  Query: {
    getUser: async (parent, args) => {
      try {
        const user = await User.findOne(args.where);
        if (!user) throw new Error('User not found');

        return user;
      } catch (error) {
        throw errorLogger(error);
      }
    },
  },
  Mutation: {
    signUp: async (parent, args) => {
      try {
        await User.signUp(args.input);

        return 'User signed in successfully';
      } catch (error) {
        throw errorLogger(error);
      }
    },
    signIn: async (parent, args) => {
      try {
        const result = await User.signIn(args.input);

        return result;
      } catch (error) {
        throw errorLogger(error);
      }
    },
    updatePassword: async (parent, args, context) => {
      try {
        if (!context.user) throw new Error('Unauthenticated user');

        const result = await User.updatePassword(args._id, args.input);

        return result;
      } catch (error) {
        throw errorLogger(error);
      }
    },
    verifyPhoneNumber: async (parent, args, context) => {
      try {
        if (!context.user) throw new Error('Unauthenticated user');

        const result = await User.verifyPhoneNumber(args._id);

        return result;
      } catch (error) {
        throw errorLogger(error);
      }
    },
    refreshToken: async (parent, args) => {
      try {
        const result = await Authentication.refreshToken(args.token);

        return result;
      } catch (error) {
        throw errorLogger(error);
      }
    },
  },
};
