import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

import { server } from './src/utils/config/server-config';
import { getUserFromHeader } from './src/utils/config/user';
import { db } from './src/utils/functions/db';
import { Context } from './src/utils/types/context';

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async (context) => {
      const user = getUserFromHeader(context.event.headers['x-user']);

      return { db, user } satisfies Context;
    },
  }
);
