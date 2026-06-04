/* eslint-env jest */
require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
process.env.PORT = process.env.PORT || '8080';

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://test:test@localhost:5432/pawmatch_test';

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db.postgres');

const testUser = {
  name: 'Auth Test User',
  email: 'auth-test@example.com',
  password: 'Password123',
};

beforeEach(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', [testUser.email]);
});

afterAll(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', [testUser.email]);
  await pool.end();
});

describe('Auth routes', () => {
  it('registers a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('rejects duplicate email registration', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(response.statusCode).toBe(400);
  });

  it('logs in successfully with valid credentials', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('rejects login with wrong password', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'WrongPassword123',
    });

    expect(response.statusCode).toBe(401);
  });

  it('allows access with a valid token', async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    const token = registerResponse.body.token;

    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('rejects access with missing token', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.statusCode).toBe(401);
  });

  it('rejects access with invalid token', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.statusCode).toBe(401);
  });
});
