require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/project.model');
const { mongoConnect } = require('./connect');

describe('given a connection with MongoDB', () => {
  let initialEnv;
  beforeAll(() => {
    initialEnv = process.env.NODE_ENV;
  });
  afterAll(() => {
    process.env.NODE_ENV = initialEnv;
    mongoose.disconnect();
  });

  describe('when the environment is testing', () => {
    test('then should exist our DB ', async () => {
      process.env.NODE_ENV = 'dev';
      process.env.DB_USER = 'Miwelord13';
      let connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections[0].name).toBe(process.env.DB_NAME);
      mongoose.disconnect();

      process.env.NODE_ENV = 'prod';
      process.env.DB_USER = 'Miwelord13';
      connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections[0].name).toBe(process.env.DB_NAME_PROD);
      mongoose.disconnect();

      process.env.NODE_ENV = 'test';
      process.env.DB_USER = 'Miwelord13';
      connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections).toBeTruthy();
      expect(Project.collection.modelName).toBe('Project');
      expect(connect.connections[0].name).toBe(process.env.DB_NAME_TEST);
    });
  });
});
