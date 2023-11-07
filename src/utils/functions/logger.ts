import { GraphQLRequest } from '@apollo/server';
import chalk from 'chalk';
import { ZodError } from 'zod';

import { ApolloError, UserInputError } from './errors';

export type BaseContext = Record<string, any>;

export const errorLogger = (error: unknown): ApolloError => {
  if (error instanceof ApolloError) {
    console.error(chalk.hex('#e41749')('Error:', JSON.stringify(error, null, 2)));

    return error;
  }

  if (error instanceof ZodError) {
    console.error(
      chalk.hex('#e41749')(
        'Error:',
        JSON.stringify(
          error.issues.map((zodError) => zodError.message),
          null,
          2
        )
      )
    );

    return new UserInputError('Invalid input', error.issues);
  }

  console.error(chalk.hex('#e41749')('Error:', JSON.stringify(error, null, 2)));
  return error as ApolloError;
};

export const logger = (query?: string, request?: GraphQLRequest) => {
  console.log(`Query: ${query}
Request: ${JSON.stringify(request, null, 2)}`);
};
