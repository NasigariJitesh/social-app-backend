/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { testMongoConfig } from '../src/utils/config/env';

export = async function globalTeardown() {
  if (testMongoConfig.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }

  const client = new MongoClient(process.env.DATABASE_URL!);

  client.close();
};
