/* eslint-env jest */
/* global describe, it */

const request = require('supertest');
const Joi = require('joi');
const { successfulProdutoSchema } = require('../schema/produtosSchema');
const app = require('../app');
require('dotenv').config();

describe('GET produtos', () => {
    it('ira retornar 200', async () => {
        const response = await request(app)
            .get('/produtos')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        Joi.assert(response.body, successfulProdutoSchema);
    });
});
