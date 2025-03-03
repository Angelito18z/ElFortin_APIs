import { expect } from 'chai';
import promocionesModelo from '../../modelos/promociones/promocionModelo.js';
import request from 'supertest'; // Importar supertest (libreria para hacer solicitudes HHTP)
import { app, server } from '../../index.js';

describe('Pruebas de la API promociones', () => {
    let  getAll, getId;
    
    // Ejecutar antes de cada prueba 'it'
    before(async () => {
         getAll = await promocionesModelo.obtenerTodo();
        getId = await promocionesModelo.obtenerPromocionId(1);
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

        it('Devuelve el código de estado 200 para GET /promociones', async () => {
            const res = await request(app).get('/api/promociones');
            expect(res.status).to.equal(200);
        });
        it('Devuelve el código de estado 404 si no se encuentran promociones', async () => {
            const res = await request(app).get('/api/promociones/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });
        it('Cada promoción devuelta tiene los campos correctos', () => {
            expect( getAll[0]).to.have.property('id');
            expect( getAll[0]).to.have.property('code');
            expect( getAll[0]).to.have.property('description');
            expect( getAll[0]).to.have.property('discount_type');
            expect( getAll[0]).to.have.property('value');
            expect( getAll[0]).to.have.property('start_date');
            expect( getAll[0]).to.have.property('end_date');
            expect( getAll[0]).to.have.property('active');
            expect( getAll[0]).to.have.property('created_at');
            expect( getAll[0]).to.have.property('updated_at');
            expect( getAll[0]).to.have.property('deleted_at');
        });
    
    });

    describe('Pruebas del metodo GET promocion por id', () => {

        it('Devuelve un objeto',  () => {
            expect(getId).to.be.an('object');
        });  

        it('No devuelve un array',  () => {
            expect(getId).to.be.not.an('array');
        });  



    });
});
