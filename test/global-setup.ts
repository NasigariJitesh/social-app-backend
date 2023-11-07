/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { env, testMongoConfig } from '../src/utils/config/env';

export = async function globalSetup() {
  if (testMongoConfig.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.DATABASE_URL = `mongodb://${testMongoConfig.IP}:${testMongoConfig.Port}`;
  }

  const client = new MongoClient(process.env.DATABASE_URL);

  // The following is to make sure the database is clean before an test starts
  await client.connect();
  await client.db(env.DB_NAME).dropDatabase();
  await client.close();
};
