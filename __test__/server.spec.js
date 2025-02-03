const request = require('supertest');
const app = require('../src/server/server');

describe('Express Server API', () => {
    it('should store the first part of the trip data on POST /add-coordinates-and-date-data', async () => {
        const res = await request(app)
            .post('/add-coordinates-and-date-data')
            .send({ latitude: '40.7143', longitude: '-74.006', country: 'United States', place: 'New York', date: '2025-02-02', daysUntilTrip: 1 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Coordinates and date data added successfully');
    });

    it('should retrieve stored trip data on GET /all', async () => {
        const res = await request(app).get('/all');
        expect(res.statusCode).toBe(200);
        expect(res.body.place).toBe('New York'); 
    });
});