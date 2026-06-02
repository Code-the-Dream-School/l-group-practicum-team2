require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');

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
    expect(response.body.animal).toStrictEqual({
      id: '15d54d98-32b8-4067-931e-8144dc5e753f',
      shelter_id: '57d23cea-472d-4c0c-bc3a-50df70f048c7',
      name: 'Bruce',
      species: 'CAT',
      breed: 'Toyger',
      age_years: 14.76,
      age_category: 'SENIOR',
      size: 'MEDIUM',
      special_needs: false,
      temperament: 'Friendly and playful',
      description:
        'Arma vilitas unde comminor nesciunt iusto dolorum capillus. Sublime tepesco vinco thalassinus advenio curto. Veritatis sumptus contabesco alius curatio carcer comis.',
      photo_url: 'https://cdn2.thecatapi.com/images/MTY5NDczNA.jpg',
      status: 'AVAILABLE',
      created_at: '2026-04-19T08:52:04.321Z',
      updated_at: '2026-05-16T03:42:28.585Z',
      shelter: {
        name: 'Port Dustin Humane Society',
        email: 'roland.johnston@hotmail.com',
        phone: '(675) 200-0768',
        address: '269 Franz Harbor, Port Dustin, DE',
      },
    });
  });

  it('Code 404 (not found) on bad ID', async () => {
    const response = await request(app).get(
      '/api/animals/a3fb6910-ec4b-47a8-96fc-032fbd43171c'
    );

    expect(response.statusCode).toBe(404);
  });
});
