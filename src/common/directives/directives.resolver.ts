/* eslint-disable no-param-reassign */
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable consistent-return */
import { getDirective, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export const authorizationDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return mapSchema(schema, {
    'MapperKind.TYPE': (type) => {
      const authDirective = getDirective(schema, type, directiveName)?.[0];

      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }

      // eslint-disable-next-line
      return undefined;
    },
    'MapperKind.OBJECT_FIELD': (fieldConfig) => {
      const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[directiveName];

      if (authDirective) {
        const { requires } = authDirective;

        if (requires) {
          const { resolve } = fieldConfig;

          fieldConfig.resolve = (source, args, context, info) => {
            if (resolve) return resolve(source, args, context, info);
          };

          return fieldConfig;
        }
      }
    },
  });
};
