import { expect } from 'chai';
import pedidosModelo from '../modelos/pedidos/pedidosModelo.js';
import request from 'supertest'; // Importar supertest (librería para hacer solicitudes HTTP)
import { app, server } from '../index.js';

describe('Pruebas de la API Pedidos', () => {
    let getAll, getId, firstOrder;

    // Ejecutar antes de cada prueba 'it'
    before(async () => {
        getAll = await pedidosModelo.findAll();  // Obtiene todos los pedidos
        getId = await pedidosModelo.findById(1); // Obtiene el pedido con ID 1
        firstOrder = getAll[0]; // Extraer el primer pedido para usar en los tests
    });

    // Ejecutar después de todas las pruebas 
    after(async () => {
        // Cerrar el servidor de Express
        server.close();
    });

    describe('Pruebas del método GET', () => {
        it('Devuelve un array', () => {
            expect(getAll).to.be.an('array');
        });

        it('Hay objetos dentro del array', () => {
            expect(getAll[0]).to.be.an('object');
        });

        

        it('Devuelve el código de estado 404 si no se encuentran pedidos', async () => {
            const res = await request(app).get('/api/orders/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });

        it('Cada pedido devuelto tiene los campos correctos', () => {
            expect(firstOrder).to.have.property('id');
            expect(firstOrder).to.have.property('restaurant_id');
            expect(firstOrder).to.have.property('table_number');
            expect(firstOrder).to.have.property('total_amount');
            expect(firstOrder).to.have.property('client_id');
            expect(firstOrder).to.have.property('pre_tax_total');
            expect(firstOrder).to.have.property('post_tax_total');
            expect(firstOrder).to.have.property('payment_method_id');
            expect(firstOrder).to.have.property('status_id');
            expect(firstOrder).to.have.property('order_type');
            expect(firstOrder).to.have.property('discount_id');
            expect(firstOrder).to.have.property('created_at');
            expect(firstOrder).to.have.property('updated_at');
            expect(firstOrder).to.have.property('deleted_at');
        });
    });

    describe('Pruebas del método GET pedido por id', () => {
        it('Devuelve un objeto', async () => {
            expect(getId).to.be.an('object');
        });

        it('No devuelve un array', async () => {
            expect(getId).to.not.be.an('array');
        });

     

        it('Devuelve un código de estado 404 si el ID no existe', async () => {
            const res = await request(app).get('/api/orders/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });
    });
});
