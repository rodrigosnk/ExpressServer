/* eslint-env jest */
/* global describe, it */


const request = require('supertest');
const Joi = require('joi');
const { successfulClienteSchema } = require('../schema/clienteSchema');
const { errorClienteSchema } = require('../schema/clienteSchema');
const app = require('../app');
require('dotenv').config();

let iddeusuariotemporario = null;


describe('get cliente desautenticado', () => {
  it('ira retornar 400', async () => {
    const { body } = await request(app)
      .get('/clientes')
      .send()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
    Joi.assert(body, errorClienteSchema);
  });
});

describe('GET clientes autenticado', () => {
    it('ira retornar 200', async () => {
        const token = await getAuthToken();
        
        const { body } = await request(app)
            .get('/clientes')
            .set('Authorization', `${token}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        Joi.assert(body, successfulClienteSchema);
    });
});

describe('POST cliente autenticado', () => {
    it('deve inserir um cliente', async () => {
        const token = await getAuthToken();
        const novoCliente = {
            nome: 'Cliente Teste',
            sobrenome: 'Sobrenome Teste',
            email: 'cliente.teste@exemplo.com',
            idade: 30
        };

        await request(app)
            .post('/clientes')
            .send(novoCliente)
            .set('Authorization', `${token}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201);
        
        iddeusuariotemporario = await getRealUserId(token, novoCliente.email);
    });
});

describe('PUT cliente autenticado', () => {
    it('deve atualizar um cliente', async () => {
        const token = await getAuthToken();
        const clienteAtualizado = {
            id: iddeusuariotemporario,
            nome: 'Cliente Teste Atualizado',
            sobrenome: 'Sobrenome Atualizado',
            email: 'teste.atualizado@exemplo.com',
            idade: 35
        };

        await request(app)
            .put('/clientes')
            .send(clienteAtualizado)
            .set('Authorization', `${token}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(204);
    });
});

describe('DELETE cliente autenticado', () => {
    it('deve remover um cliente', async () => {
        const token = await getAuthToken();
        
        await request(app)
            .delete(`/clientes/${iddeusuariotemporario}`)
            .set('Authorization', `${token}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(204);
    });
});

async function getAuthToken() {
  const loginResponse = await request(app)
    .post('/login')
    .send({
      user: process.env.ADMIN_USER, 
        password: process.env.ADMIN_PASSWORD
    })
    .set('Content-Type', 'application/json');
  
  return loginResponse.body.token;
}

async function getRealUserId(token, email) {
    const response = await request(app)
        .get('/clientes')
        .set('Authorization', `${token}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    
    const users = response.body.data || response.body;
    const testUser = users.find(user => user.email === email);
    return testUser ? testUser.id : null;
}
