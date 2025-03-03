import { expect } from 'chai';
import request from 'supertest'; // Library for HTTP requests
import { app, server } from '../../index.js';

describe('Integration Tests for API /api/promociones', () => {
  // Clean up after tests
  after(() => {
    server.close(); // Close the server after tests
  });

  describe('Integration Tests for API /api/promociones', () => {
    describe('GET /api/promociones', () => {
      it('Returns a 200 status and an array of promotions', async () => {
        const res = await request(app).get('/api/promociones');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array'); // Check that data is an array
        if (res.body.data.length > 0) {
          expect(res.body.data[0]).to.have.property('id'); // Check the 'id' property
          expect(res.body.data[0]).to.have.property('code'); // Check the 'code' property
          expect(res.body.data[0]).to.have.property('description'); // Check the 'description' property
          // Add other fields to check as needed
        }
      });
  
      it('Returns a 404 status when promotions are not found', async () => {
        const res = await request(app).get('/api/promociones/9999'); // Nonexistent ID
        expect(res.status).to.equal(404);
      });
    });
  });

  describe('GET /api/promociones/:id', () => {
    it('Returns a 200 status and a single promotion for a valid ID', async () => {
      // Replace '1' with a valid ID from your database
      const res = await request(app).get('/api/promociones/1');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.have.property('id', '1'); // Check if 'id' is a string '1'
    });

    it('Returns a 404 status for an invalid ID', async () => {
      const res = await request(app).get('/api/promociones/9999'); // Nonexistent ID
      expect(res.status).to.equal(404);
    });
  });
});
