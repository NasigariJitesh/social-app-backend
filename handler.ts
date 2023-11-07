import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

import { server } from './src/utils/config/server-config';
import { db } from './src/utils/functions/db';
import { Context } from './src/utils/types/context';

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async (context) => {
      const { user } = context.event.headers;

      return { db, user: user as never } satisfies Context;
    },
  }
);
