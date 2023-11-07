import { config } from 'dotenv';

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '4000',

  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  DATABASE_URL: process.env.DATABASE_URL!,
  USER_COLLECTION: 'user',
  LOGIN_ACTIVITY_COLLECTION: 'login_activity',
};

export const testMongoConfig = {
  Memory: true,
  IP: '127.0.0.1',
  Port: '27017',
  Database: 'test',
};
