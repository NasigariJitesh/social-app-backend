## About the template

This is a starter template containing all the required tools to build a backend application using graphql.

## Getting Started

```
git clone https://github.com/freak2810/graphql-starter-template.git
```

## Built with

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Apollo Server + Federation](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Serverless](https://www.serverless.com/framework/docs)

## Features

- ✅ Supports both server and serverless deployments
- ✅ ESLint + Prettier
- ✅ GraphQL API
- ✅ Apollo Federation
- ✅ Automatic code generation for GraphQL types and resolvers using [graphql-code-generator](https://the-guild.dev/graphql/codegen)
- ✅ Validation using Zod. [Learn more](https://github.com/withshepherd/graphql-codegen-zod)
- ✅ Testing setup using Jest

<br/>

## Updates

### 17th April, 2023

- Updated the codegen to use `mergeTypeDefs` instead of `graphql-ast`. Now graphql schema is updated on the fly, but still requires a restart if the types need to be updated.
- Updated directives to support proper schema generation with mongo-db related directives and zod validations.

### 20th April, 2023

- Added `ts-node` to the dev dependencies. This is now used to run the development server.

### 10th July, 2023

- Added Role based Access Control mechanism for the project.
- Minor fixes to some unused code.
- Added github actions for CI/CD.
  - Linting
  - Testing
  - Code coverage
  - Deployment to AWS Lambda

### 3rd August, 2023

- The database is directly takes from the uri provided in the environment variables.
- Removed globals.d.ts file.
- Changed the type of URL from string to URL.
- Updated packages.

## Author

[Aditya Manikanth Rao](https://github.com/freak2810)
