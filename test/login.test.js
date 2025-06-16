/* eslint-env jest */
/* global describe, it */


const request = require('supertest');
const Joi = require('joi');
const { successfulLoginSchema } = require('../schema/loginSchema');
const { errorLoginSchema } = require('../schema/loginSchema');
const app = require('../app');
require('dotenv').config();


describe('POST login', () => {
  it('validate POST in login', async () => {
    const { body } = await request(app)
      .post('/login')
      .send({ 
        user: process.env.ADMIN_USER, 
        password: process.env.ADMIN_PASSWORD 
    })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
    Joi.assert(body, successfulLoginSchema);
  });
});

describe('POST login com credenciais erradas', () => {
  it('ira retornar 400', async () => {
    const { body } = await request(app)
      .post('/login')
      .send({ 
        user: 'invalidUser', 
        password: 'invalidPassword' 
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/);
    Joi.assert(body, errorLoginSchema);
  });
});
