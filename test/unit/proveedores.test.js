import { expect } from 'chai';
import proveedoresModelo from '../../modelos/proveedores/proveedorModelo.js';
import request from 'supertest'; // Importar supertest (libreria para hacer solicitudes HHTP)
import { app, server } from '../../index.js';

describe('Pruebas de la API proveedores', () => {
    let  getAll, getId;
    
    // Ejecutar antes de cada prueba 'it'
    before(async () => {
         getAll = await proveedoresModelo.obtenerTodo();
        getId = await proveedoresModelo.obtenerProveedorId(1);
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

        it('Devuelve el código de estado 200 para GET /proveedores', async () => {
            const res = await request(app).get('/api/proveedores');
            expect(res.status).to.equal(200);
        });
        it('Devuelve el código de estado 404 si no se encuentran proveedores', async () => {
            const res = await request(app).get('/api/proveedores/9999'); // ID que no existe
            expect(res.status).to.equal(404);
        });
        it('Cada proveedor devuelto tiene los campos correctos', () => {
            expect( getAll[0]).to.have.property('id');
            expect( getAll[0]).to.have.property('name');
            expect( getAll[0]).to.have.property('contact_info');
            expect( getAll[0]).to.have.property('created_at');
            expect( getAll[0]).to.have.property('updated_at');
            expect( getAll[0]).to.have.property('deleted_at');
        });
    
    });

    describe('Pruebas del metodo GET proveedor por id', () => {

        it('Devuelve un objeto',  () => {
            expect(getId).to.be.an('object');
        });  

        it('No devuelve un array',  () => {
            expect(getId).to.be.not.an('array');
        });  



    });
});
