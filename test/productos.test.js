import { expect } from 'chai';
import productModel from '../modelos/productos/productModel.js';
import request from 'supertest'; // Importar supertest (libreria para hacer solicitudes HHTP)
import { app, server } from '../index.js';

describe('Pruebas de la API productos', () => {
    let  getAll, getId;
    
    // Ejecutar antes de cada prueba 'it'
    before(async () => {
         getAll = await productModel.obtenerTodo();
        getId = await productModel.obtenerVentaId(1);
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

        it('Devuelve el código de estado 200 para GET /ventas', async () => {
            const res = await request(app).get('/api/ventas');
            expect(res.status).to.equal(200);
        });
        it('Devuelve el código de estado 404 si no se encuentran ventas', async () => {
            const res = await request(app).get('/api/ventas/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });
        it('Cada venta devuelta tiene los campos correctos', () => {
            expect( getAll[0]).to.have.property('id');
            expect( getAll[0]).to.have.property('restaurant_id');
            expect( getAll[0]).to.have.property('report_date');
            expect( getAll[0]).to.have.property('total_sales');
            expect( getAll[0]).to.have.property('created_at');
            expect( getAll[0]).to.have.property('updated_at');
            expect( getAll[0]).to.have.property('deleted_at');
        });
    
    });

    describe('Pruebas del metodo GET venta por id', () => {

        it('Devuelve un objeto',  () => {
            expect(getId).to.be.an('object');
        });  

        it('No devuelve un array',  () => {
            expect(getId).to.be.not.an('array');
        });  



    });
});
