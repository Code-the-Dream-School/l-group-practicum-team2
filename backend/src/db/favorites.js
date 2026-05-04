const pool = require('../config/db.postgres');

const addFavorite = async (userId, animalId) => {
  const result = await pool.query(
    `INSERT INTO favorites (user_id, animal_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, animal_id) DO NOTHING
     RETURNING *`,
    [userId, animalId]
  );

  return result.rows[0];
};

const getFavoritesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT 
      animals.id,
      animals.name,
      animals.photo_url,
      animals.species,
      animals.age_category,
      animals.special_needs
     FROM favorites
     JOIN animals ON favorites.animal_id = animals.id
     WHERE favorites.user_id = $1`,
    [userId]
  );

  return result.rows;
};

const deleteFavorite = async (userId, animalId) => {
  const result = await pool.query(
    `DELETE FROM favorites
     WHERE user_id = $1 AND animal_id = $2
     RETURNING *`,
    [userId, animalId]
  );

  return result.rows[0];
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  deleteFavorite,
};