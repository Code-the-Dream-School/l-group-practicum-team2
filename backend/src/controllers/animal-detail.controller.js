const pool = require("../config/db.postgres");

const getAnimalDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const animalQuery = await pool.query(
      `SELECT * FROM animals WHERE id = $1`,
      [id],
    );
    let animal = animalQuery.rows[0];
    const shelterQuery = await pool.query(
      `SELECT name, email, phone, address, city, state, id FROM shelters WHERE id = $1`,
      [animal.shelter_id],
    );
    animal.shelter = {};
    animal.shelter.name = shelterQuery.rows[0].name;
    animal.shelter.email = shelterQuery.rows[0].email;
    animal.shelter.phone = shelterQuery.rows[0].phone;
    animal.shelter.address = `${shelterQuery.rows[0].address}, ${shelterQuery.rows[0].city}, ${shelterQuery.rows[0].state}`;
    return res.status(200).json({ animal });
  } catch (error) {
    console.error("Error fetching animal details:", error);
    if (error.code === "22P02") {
      return res.status(404).json({ error: `Animal with ID ${id} not found` });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAnimalDetails };
