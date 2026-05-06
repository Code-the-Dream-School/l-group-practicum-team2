const pool = require("../config/db.postgres");

const getAnimalDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const animalQuery = await pool.query(
      `SELECT * FROM animals WHERE id = $1`,
      [id],
    );
    let animal = animalQuery.rows[0];
    if (!animal) {
      return res.status(404).json({ error: `Animal was not found` });
    }
    const shelterQuery = await pool.query(
      `SELECT name, email, phone, address, city, state, id FROM shelters WHERE id = $1`,
      [animal.shelter_id],
    );
    const shelter = shelterQuery.rows[0];
    if (!shelter) {
      return res
        .status(404)
        .json({ error: `Shelter associated with animal was not found` });
    }
    animal.shelter = {};
    animal.shelter.name = shelter.name;
    animal.shelter.email = shelter.email;
    animal.shelter.phone = shelter.phone;

    const addressParts = [shelter.address, shelter.city, shelter.state];
    const formattedAddress = addressParts
      .filter((part) => part != null && part !== "" && part != undefined)
      .join(", ");
    animal.shelter.address = formattedAddress;

    return res.status(200).json({ animal });
  } catch (error) {
    console.error("Error fetching animal details:", error);
    if (error.code === "22P02") {
      return res.status(400).json({ error: `Invalid ID format` });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAnimalDetails };
