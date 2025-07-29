const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../API/UserAPI'); 
const User = require('../model/UserSchema');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany(); // clean up between tests
});


describe('User API', () => {
    test('POST /api/users should create a new user', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'Test User',
            result: 90,
            date: '2025-07-29',
            password: 'secret123'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test User');
        expect(res.body).not.toHaveProperty('password');
    });

    test('GET /api/users should return list of users', async () => {
        await User.create({ name: 'Test', result: 85, date: new Date(), password: 'abc123' });

        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).not.toHaveProperty('password');
    });

    test('GET /api/users/:id returns user by ID', async () => {
        const user = await User.create({ name: 'One', result: 80, date: new Date(), password: 'abc123' });

        const res = await request(app).get(`/api/users/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('One');
    });

    test('PUT /api/users/:id updates user', async () => {
        const user = await User.create({ name: 'ToUpdate', result: 50, date: new Date(), password: 'abc123' });

        const res = await request(app)
            .put(`/api/users/${user._id}`)
            .send({ result: 99 });

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(99);
    });

    test('DELETE /api/users/:id deletes user', async () => {
        const user = await User.create({ name: 'ToDelete', result: 70, date: new Date(), password: 'abc123' });

        const res = await request(app).delete(`/api/users/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'User deleted successfully' });
    });
});
