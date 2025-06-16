/* eslint-env jest */
/* global describe, it */


const request = require('supertest');
const Joi = require('joi');
const { errorSignUpSchema } = require('../schema/signUpSchema');
const app = require('../app');
require('dotenv').config();

describe('POST signUp para usuario que ja existe', () => {
  it('ira retornar 409', async () => {
    const { body } = await request(app)
      .post('/signUp')
      .send({ 
        user: process.env.ADMIN_USER, 
        password: process.env.ADMIN_PASSWORD 
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(409)
      .expect('Content-Type', /json/);
    Joi.assert(body, errorSignUpSchema);
  });
});
