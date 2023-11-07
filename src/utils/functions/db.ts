import chalk from 'chalk';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { env } from '../config/env';

export const startMongoTestServer = async () => {
  if (process.env.NODE_ENV !== 'testing') return;

  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  process.env.DATABASE_URL = uri;
  env.DATABASE_URL = uri;
};

export const client: MongoClient = new MongoClient(env.DATABASE_URL);

export const db = client.db();

if (process.env.NODE_ENV !== 'testing')
  console.log(chalk.hex('#17b978')('🐣 MongoDB client connected! database:', db.databaseName));
