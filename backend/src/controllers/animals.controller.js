const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres');
const { NotFoundError } = require('../errors');

const getAnimals = async (req, res, next) => {
  try {
    const { species, size, age_category, special_needs, status } = req.query;

    const conditions = [];
    const values = [];

    if (species) {
      values.push(species.toLowerCase());
      conditions.push(`LOWER(a.species) = $${values.length}`);
    }

    if (size) {
      values.push(size.toLowerCase());
      conditions.push(`LOWER(a.size::text) = $${values.length}`);
    }

    if (age_category) {
      values.push(age_category.toLowerCase());
      conditions.push(`LOWER(a.age_category::text) = $${values.length}`);
    }

    if (special_needs !== undefined) {
      values.push(special_needs === 'true');
      conditions.push(`a.special_needs = $${values.length}`);
    }

    if (status) {
      values.push(status.toLowerCase());
      conditions.push(`LOWER(a.status::text) = $${values.length}`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT
        a.id,
        a.name,
        a.species,
        a.breed,
        a.age_years,
        a.age_category,
        a.size,
        a.special_needs,
        a.temperament,
        a.description,
        a.photo_url,
        a.status,
        a.created_at,
        s.name          AS shelter_name,
        s.city          AS shelter_city,
        s.email         AS shelter_email,
        s.phone         AS shelter_phone
      FROM animals a
      LEFT JOIN shelters s ON a.shelter_id = s.id
      ${whereClause}
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query, values);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, animals: result.rows });
  } catch (error) {
    next(error);
  }
};

const getAnimalDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const animalQuery = await pool.query(
      `SELECT * FROM animals WHERE id = $1`,
      [id]
    );
    let animal = animalQuery.rows[0];
    if (!animal) {
      throw new NotFoundError(`Animal was not found`);
    }
    const shelterQuery = await pool.query(
      `SELECT name, email, phone, address, city, state, id FROM shelters WHERE id = $1`,
      [animal.shelter_id]
    );
    const shelter = shelterQuery.rows[0];
    if (!shelter) {
      throw new NotFoundError('Shelter associated with animal was not found');
    }
    const addressParts = [shelter.address, shelter.city, shelter.state];
    const formattedAddress = addressParts
      .filter((part) => part != null && part !== '' && part != undefined)
      .join(', ');

    const response = {
      animal: {
        ...animal,
        shelter: {
          name: shelter.name,
          email: shelter.email,
          phone: shelter.phone,
          address: formattedAddress,
        },
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnimals, getAnimalDetails };
