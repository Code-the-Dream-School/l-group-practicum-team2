require("dotenv").config();
const { Pool } = require("pg");
const { faker } = require("@faker-js/faker");
const { hashPassword } = require('../utils/authHelper')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});



const isTableEmpty = async (client, tableName) => {
  const res = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
  return parseInt(res.rows[0].count, 10) === 0;
};

const seedUsers = async (client) => {
  if (!(await isTableEmpty(client, "users"))) {
    console.log("Users already exist, skipping seed");
    return;
  }

  for (let i = 0; i < 3; i++) {
    const name = faker.person.firstName();
    const email = faker.internet.email().toLowerCase();
    const role = "USER";
    const password_hash = await hashPassword("password$123")

    await client.query(
      `INSERT INTO users (name, email, role, password_hash)
        VALUES ($1, $2, $3, $4)`,
      [name, email, role, password_hash]
    );
  }

  console.log("Users seeded");
  return;
    
};
const seedShelters = async (client) => {
  if (!(await isTableEmpty(client, "shelters"))) {
    console.log("Shelters already exist, skipping seed");
    return;
  }
  

  const nameList = ["Upland Animal Adoption Center", "Port Dustin Humane Society", "Happy Animal Rescue", "Happy Animal Shelter", "Gentle Animal Rescue"];

  for (let name of nameList) {
  //   const name = faker.company.name();

    const email = faker.internet.email().toLowerCase();
    const phone = `(${faker.string.numeric(3)}) ${faker.string.numeric(3)}-${faker.string.numeric(4)}`;
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state({ abbreviated: true });

    await client.query(
      `INSERT INTO shelters (name, email, phone, address, city, state)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, phone, address, city, state]
    );
  }

  console.log("Shelters seeded");
  return;
};

const seedAnimals = async (client) => {
    if (!(await isTableEmpty(client, "animals"))) {
      console.log("Animals already exist, skipping seed");
      return;
    }

    // 1. get shelters
    const sheltersRes = await client.query("SELECT id FROM shelters");
    const shelters = sheltersRes.rows;

    if (shelters.length === 0) {
      throw new Error("No shelters found. Seed shelters first.");
    }

    const speciesList = ["DOG", "CAT", "RABBIT"];
    // const ageCategories = ["const ageCategories = ["YOUNG", "ADULT", "SENIOR"]; "]; 
    const sizes = ["SMALL", "MEDIUM", "LASRGE"]; 
    const statuses = ["AVAILABLE", "ADOPTED"]; 
    const temperaments = [
                            "Friendly and playful",
                            "Calm and gentle",
                            "Energetic and curious",
                            "Shy but affectionate",
                            "Independent and quiet",
                            "Loyal and protective",
                          ];
    // 2. create 6 animals for each shelter
    for (const shelter of shelters) {
      for (let i = 0; i < 6; i++) {

        const name = faker.person.firstName();

        const species = faker.helpers.arrayElement(speciesList);

        let breed;
        if (species === "DOG") 
          breed = faker.animal.dog();
        else if (species === "CAT") 
          breed = faker.animal.cat();
        else // RABBIT
          breed = faker.animal.rabbit();

        const ageYears = parseFloat(faker.number.float({ min: 0.2, max: 15 }).toFixed(2));

        let ageCategory;

        if (ageYears < 2) 
          ageCategory = "YOUNG";
        else if (ageYears < 8) 
          ageCategory = "ADULT";
        else 
          ageCategory = "SENIOR";

        await client.query(
          `INSERT INTO animals (
            shelter_id,
            name,
            species,
            breed,
            age_years,
            age_category,
            size,
            special_needs,
            temperament,
            description,
            photo_url,
            status
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [
            shelter.id,
            name,
            species,
            breed,
            ageYears,
            ageCategory,
            faker.helpers.arrayElement(sizes),
            faker.datatype.boolean(),
            faker.helpers.arrayElement(temperaments),
            faker.lorem.paragraph(),
            faker.image.url({ category: "animal" }),
            faker.helpers.arrayElement(statuses),
          ]
        );
      }
    }

    console.log("Seeded 6 animals for each shelter");
    return;
};

const seedFavorites = async (client) => {
    if (!(await isTableEmpty(client, "favorites"))) {
      console.log("Favorites already exist, skipping seed");
      return;
    }
    // get users
    const usersRes = await client.query("SELECT id FROM users");
    //    { ..., rows:[ { id: 'uuid-1' },{ id: 'uuid-2' },... ]}
    const users = usersRes.rows;

    if (users.length === 0) {
      throw new Error("No user found. Seed users first.");
    }

    // get animasl array
    const animalsRes = await client.query("SELECT id FROM animals");
    const animals = animalsRes.rows;

    if (animals.length === 0) {
      throw new Error("No animal found. Seed animals first.");
    }

    // keep track of used animals
    

    for (const user of users) {
      let used = new Set();
      for (let i = 0; i < 3; i++) {

        let randomAnimal;

        do {
          randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        } while (used.has(randomAnimal.id));

        try {
          await client.query(
            `INSERT INTO favorites (
              user_id, animal_id
            ) VALUES ($1,$2)`,
            [ user.id, randomAnimal.id ]
          );
          used.add(randomAnimal.id)
        } catch (err) {
          console.error("Insert failed:", err);

        }
        
      }
    }

    console.log("Seeded 3 favorites for each user");
    return;
};

const seedInquiries = async (client) => {
    if (!(await isTableEmpty(client, "inquiries"))) {
      console.log("Inquiries already exist, skipping seed");
      return;
    }
    // get users
    const usersRes = await client.query("SELECT id FROM users");
    //    { ..., rows:[ { id: 'uuid-1' },{ id: 'uuid-2' },... ]}
    const users = usersRes.rows;

    if (users.length === 0) {
      throw new Error("No user found. Seed users first.");
    }

    // get animasl array
    const animalsRes = await client.query("SELECT id FROM animals");
    const animals = animalsRes.rows;

    if (animals.length === 0) {
      throw new Error("No animal found. Seed animals first.");
    }
    
    const statusList = ['SENT', 'PROCESSING', 'CLOSED']; 

    for (let i=0; i<15; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const message = faker.lorem.sentences(2);
        const messageStatus = faker.helpers.arrayElement(statusList);
   
        await client.query(
          `INSERT INTO inquiries (
            user_id, animal_id, message, status
          ) VALUES ($1,$2, $3, $4)`,
          [ randomUser.id, randomAnimal.id, message, messageStatus ]
        );
     }
    

    console.log("Seeded 15 inquiries");
    return;
};

const runSeeds = async () => {
  const client = await pool.connect();
  try {

    await client.query("BEGIN");

    await seedShelters(client);
    await seedUsers(client);
    await seedAnimals(client);
    await seedFavorites(client);
    await seedInquiries(client);

    await client.query("COMMIT");
    console.log("All seeds completed");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding error:", err);
  } finally {
    client.release();
    await pool.end();
  }
};

runSeeds();