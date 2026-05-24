require('dotenv').config();

process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
process.env.FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:5173';


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
});