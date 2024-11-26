import { expect } from 'chai';
import productModel from '../modelos/productos/productModel.js';
import request from 'supertest'; // Importar supertest (libreria para hacer solicitudes HHTP)
import { app, server } from '../index.js';

describe('Pruebas de la API productos', () => {
    let  getAll, getId;
    
    // Ejecutar antes de cada prueba 'it'
    before(async () => {
         getAll = await productModel.findAll();
        getId = await productModel.findById(1);
    });

      // Ejecutar después de todas las pruebas 
      after(async () => {
        // Cerrar el servidor de Express
        server.close(); 
    });

    describe('Pruebas del metodo GET', () => {
        it('Devuelve un array', () => {
            expect( getAll).to.be.an('array');
        });

        it('Hay objetos dentro del array', () => {
            expect( getAll[0]).to.be.an('object');
        });

        it('Devuelve el código de estado 200 para GET /products', async () => {
            const res = await request(app).get('/api/products');
            expect(res.status).to.equal(200);
        });
        it('Devuelve el código de estado 404 si no se encuentran productos', async () => {
            const res = await request(app).get('/api/products/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });
        it('Cada producto devuelta tiene los campos correctos', () => {
            expect( getAll[0]).to.have.property('id');
            expect( getAll[0]).to.have.property('restaurant_id');
            expect( getAll[0]).to.have.property('name');
            expect( getAll[0]).to.have.property('description');
            expect( getAll[0]).to.have.property('price');
            expect( getAll[0]).to.have.property('image_url');
            expect( getAll[0]).to.have.property('category_name');
            expect( getAll[0]).to.have.property('pre_tax_cost');
            expect( getAll[0]).to.have.property('post_tax_cost');
            expect( getAll[0]).to.have.property('created_at');
            expect( getAll[0]).to.have.property('updated_at');
            expect( getAll[0]).to.have.property('deleted_at');
        });
    
    });

    describe('Pruebas del metodo GET producto por id', () => {

        it('Devuelve un objeto',  () => {
            expect(getId).to.be.an('object');
        });  

        it('No devuelve un array',  () => {
            expect(getId).to.be.not.an('array');
        });  



    });
});
