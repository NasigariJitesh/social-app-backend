import { Resolvers } from '../utils/types/generated';

export const resolver: Resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};
