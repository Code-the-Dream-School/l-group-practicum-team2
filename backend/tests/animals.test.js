require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db.postgres');

beforeAll(async () => {
  // 1. Clear out Bruce if he was left behind from a crashed run
  await pool.query(
    "DELETE FROM animals WHERE id = '15d54d98-32b8-4067-931e-8144dc5e753f'"
  );

  // 2. Seed test data safely
  await pool.query(
    `INSERT INTO shelters (id, name, email, phone, address, city, state)
        VALUES ('57d23cea-472d-4c0c-bc3a-50df70f048c7', 'Port Dustin Humane Society', 'roland.johnston@hotmail.com', '(675) 200-0768', '269 Franz Harbor', 'Port Dustin', 'DE')
        ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;`
  );

  await pool.query(`
    INSERT INTO animals (id, shelter_id, name, species, breed, age_years, age_category, size, special_needs, temperament, description, photo_url, status, created_at, updated_at)
    VALUES ('15d54d98-32b8-4067-931e-8144dc5e753f', '57d23cea-472d-4c0c-bc3a-50df70f048c7', 'Bruce', 'CAT', 'Toyger', 14.76, 'SENIOR', 'MEDIUM', false, 'Friendly and playful', 'Test description', 'https://cdn2.thecatapi.com/images/MTY5NDczNA.jpg', 'AVAILABLE', '2026-04-19T08:52:04.321Z', '2026-05-16T03:42:28.585Z')
  `);
});

afterAll(async () => {
  // 3. Fix the single quotes here so the cleanup block actually passes!
  await pool.query(
    "DELETE FROM animals WHERE id = '15d54d98-32b8-4067-931e-8144dc5e753f'"
  );
  await pool.end();
});

describe('Animals routes', () => {
  it('Fetches all animals successfully', async () => {
    const response = await request(app).get('/api/animals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('animals');
    expect(Array.isArray(response.body.animals)).toBe(true);
    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);

    expect(response.body.animals[0]).toHaveProperty('id');
    expect(response.body.animals[0]).toHaveProperty('name');
    expect(response.body.animals[0]).toHaveProperty('species');
    expect(response.body.animals[0]).toHaveProperty('age_category');
    expect(response.body.animals[0]).toHaveProperty('size');
    expect(response.body.animals[0]).toHaveProperty('special_needs');
    expect(response.body.animals[0]).toHaveProperty('status');
  });

  it('Fetches and filters animals successfully', async () => {
    const response = await request(app).get(
      '/api/animals?species=dog&size=medium&age_category=adult&special_needs=false&status=available'
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('animals');
    expect(Array.isArray(response.body.animals)).toBe(true);
    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);

    expect(response.body.animals[0]).toHaveProperty('id');
    expect(response.body.animals[0]).toHaveProperty('name');
    expect(response.body.animals[0]).toHaveProperty('species');
    expect(response.body.animals[0]).toHaveProperty('age_category');
    expect(response.body.animals[0]).toHaveProperty('size');
    expect(response.body.animals[0]).toHaveProperty('special_needs');
    expect(response.body.animals[0]).toHaveProperty('status');

    expect(response.body.animals[0].species).toBe('Dog');
    expect(response.body.animals[0].size).toBe('MEDIUM');
    expect(response.body.animals[0].age_category).toBe('ADULT');
    expect(response.body.animals[0].special_needs).toBe(false);
    expect(response.body.animals[0].status).toBe('AVAILABLE');
  });

  it('Returns single animal successfully', async () => {
    const response = await request(app).get(
      '/api/animals/15d54d98-32b8-4067-931e-8144dc5e753f'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('animal');
    expect(response.body.animal.shelter_id).toBe(
      '57d23cea-472d-4c0c-bc3a-50df70f048c7'
    );
    expect(response.body.animal.name).toBe('Bruce');
    expect(response.body.animal.species).toBe('CAT');
    expect(response.body.animal.breed).toBe('Toyger');
    expect(response.body.animal.age_years).toBe(14.76);
    expect(response.body.animal.age_category).toBe('SENIOR');
    expect(response.body.animal.size).toBe('MEDIUM');
    expect(response.body.animal.special_needs).toBe(false);
    expect(response.body.animal.temperament).toBe('Friendly and playful');
    expect(response.body.animal.description).toBe('Test description');
    expect(response.body.animal.photo_url).toBe(
      'https://cdn2.thecatapi.com/images/MTY5NDczNA.jpg'
    );
    expect(response.body.animal.status).toBe('AVAILABLE');
    expect(response.body.animal.shelter.name).toBe(
      'Port Dustin Humane Society'
    );
    expect(response.body.animal.shelter.email).toBe(
      'roland.johnston@hotmail.com'
    );
    expect(response.body.animal.shelter.phone).toBe('(675) 200-0768');
    expect(response.body.animal.shelter.address).toBe(
      '269 Franz Harbor, Port Dustin, DE'
    );
  });

  it('Code 404 (not found) on bad ID', async () => {
    const response = await request(app).get(
      '/api/animals/a3fb6910-ec4b-47a8-96fc-032fbd43171c'
    );

    expect(response.statusCode).toBe(404);
  });
});
