const pool = require('../config/db.postgres');

const getAnimals = async (req, res) => {
  try {
    const { species, size, age_category, special_needs } = req.query;

    // Build WHERE conditions dynamically so filters work independently and in combination.
    // Using $1, $2... placeholders prevents SQL injection.
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
        s.email AS shelter_email,
        s.phone         AS shelter_phone
      FROM animals a
      LEFT JOIN shelters s ON a.shelter_id = s.id
      ${whereClause}
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query, values);

    return res.status(200).json({ animals: result.rows });
  } catch (error) {
    console.error('Get animals error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAnimals };
