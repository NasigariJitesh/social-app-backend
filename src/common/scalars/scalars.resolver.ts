/* eslint-disable consistent-return */
import { GraphQLScalarType, Kind } from 'graphql';
import { DateTimeResolver, EmailAddressResolver, JSONResolver, PostalCodeResolver, URLResolver } from 'graphql-scalars';
import { parsePhoneNumber, PhoneNumber } from 'libphonenumber-js';

import { ValidationError } from '../../utils/functions/errors';

const PhoneNumberResolver = new GraphQLScalarType<PhoneNumber | undefined, string>({
  name: 'PhoneNumber',
  description:
    "A field whose value conforms to the standard Phone number format (based on Google's Phone Number Library) format. The very powerful libphonenumber (https://github.com/googlei18n/libphonenumber library is available to take that format, parse and display it in whatever display format you want. It can also be used to parse user input and get the E.164 format to pass into a schema.",

  serialize: (value) => {
    if (typeof value === 'string') return value;

    // @ts-expect-error REASON: Typescript does not know the type yet
    if (value.number) {
      const { number } = value as { number: string };

      const phone = parsePhoneNumber(number);

      if (phone.isValid()) return phone.format('E.164');
    }

    throw new ValidationError('Invalid Phone Number');
  },

  parseValue: (value) => {
    if (typeof value === 'string') {
      const phone = parsePhoneNumber(value);

      if (phone.isValid()) return phone;
    }

    throw new ValidationError('Invalid Phone Number');
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) return parsePhoneNumber(ast.value);
  },
});

const PasswordResolver = new GraphQLScalarType<string | undefined, string>({
  name: 'Password',
  description:
    'A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character',
  serialize: (value) => {
    if (typeof value === 'string') return value;

    throw new ValidationError('Invalid Password');
  },
  parseValue: (value) => {
    if (typeof value === 'string') {
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/;

      if (regex.test(value)) return value;
    }

    throw new ValidationError('Invalid Password');
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) return ast.value;
  },
});

export const resolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  Email: EmailAddressResolver,
  URL: URLResolver,
  PostalCode: PostalCodeResolver,
  PhoneNumber: PhoneNumberResolver,
  Password: PasswordResolver,
};
