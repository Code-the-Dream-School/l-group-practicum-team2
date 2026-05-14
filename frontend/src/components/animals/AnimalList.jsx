import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import Filters from "./Filters";
import { mockAnimals } from "../../constants/animals";
import { fetchAnimals } from "../../services/AnimalService";

function AnimalList() {
  const [animals] = useState(mockAnimals);
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");

  const filteredAnimals = animals.filter((animal) => {
    return (
      (species === "" || animal.species === species) &&
      (size === "" || animal.size === size) &&
      (age === "" || animal.age_category === age)
    );
  });

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await fetchAnimals();
      } catch (error) {
        console.error(error.message);
      }
    };

    loadAnimals();
  }, []);

  return (
    <main className="app">
      <h1>Animals List</h1>

      <Filters
        species={species}
        size={size}
        age={age}
        onSpeciesChange={setSpecies}
        onSizeChange={setSize}
        onAgeChange={setAge}
      />

      {filteredAnimals.length === 0 && <p>No animals found.</p>}

      <div className="animals-grid">
        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </main>
  );
}

export default AnimalList;
