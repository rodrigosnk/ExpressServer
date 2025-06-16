/* eslint-env jest */
/* global describe, it */

const request = require('supertest');
const Joi = require('joi');
const { successfulProdutoSchema } = require('../schema/produtosSchema');
const app = require('../app');

// Variable to store the created product ID
let createdProductId = null;

describe('GET produtos', () => {
    it('ira retornar 200', async () => {
        const { body } = await request(app)
            .get('/produtos')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);
        
        Joi.assert(body, successfulProdutoSchema);
    });
});

describe('POST produto', () => {
    it('deve inserir um produto', async () => {
        const novoProduto = {
            nome: 'Produto Teste',
            descricao: 'Descrição do Produto Teste',
            preco: '15.99'
        };

        await request(app)
            .post('/produtos')
            .send(novoProduto)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201);
        
        // Get the real product ID from the created product
        createdProductId = await getRealProductId(novoProduto.nome);
    });
});

describe('PUT produto', () => {
    it('deve atualizar um produto', async () => {
        const produtoAtualizado = {
            id: createdProductId,
            nome: 'Produto Teste Atualizado',
            descricao: 'Descrição Atualizada do Produto',
            preco: '25.99'
        };

        await request(app)
            .put('/produtos')
            .send(produtoAtualizado)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(204);
    });
});

describe('DELETE produto', () => {
    it('deve remover um produto', async () => {
        await request(app)
            .delete(`/produtos/${createdProductId}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(204);
    });
});

async function getRealProductId(nome) {
    const response = await request(app)
        .get('/produtos')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    
    const products = response.body.data || response.body;
    const testProduct = products.find(product => product.nome === nome);
    return testProduct ? testProduct.id : null;
}
