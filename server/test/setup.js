/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// const app = require('../app');

let mongo;
beforeAll(async () => {
  process.env.JWT_SECRET = 'asdfasdf';
  process.env.JWT_EXPIRES_IN = '90d';
  process.env.NODE_ENV = 'production';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
