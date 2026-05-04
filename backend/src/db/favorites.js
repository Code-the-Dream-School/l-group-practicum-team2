const pool = require('..config/db.postgres');

const addFavorite = async (userId, animalId) => {
    const result = await pool.query(
        `INSERT INTO favorites (user_Id, animal_Id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, animal_id) DO NOTHING 
        RETURNING *`,
        [userId, animalId]
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
