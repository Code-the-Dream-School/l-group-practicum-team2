import { useState } from "react";
import AnimalCard from "./components/AnimalCard";
import Filters from "./components/Filters";

const mockAnimals = [
  {
    id: "1",
    name: "Bella",
    species: "Dog",
    breed: "Labrador",
    age_years: 4,
    age_category: "ADULT",
    size: "MEDIUM",
    special_needs: false,
    photo_url: "https://picsum.photos/300/200?1",
    status: "AVAILABLE",
  },
  {
    id: "2",
    name: "Max",
    species: "Cat",
    breed: "Siamese",
    age_years: 10,
    age_category: "SENIOR",
    size: "SMALL",
    special_needs: true,
    photo_url: "https://picsum.photos/300/200?2",
    status: "AVAILABLE",
  },
  {
    id: "3",
    name: "Charlie",
    species: "Dog",
    breed: "Beagle",
    age_years: 1,
    age_category: "YOUNG",
    size: "LARGE",
    special_needs: false,
    photo_url: "https://picsum.photos/300/200?3",
    status: "AVAILABLE",
  },
];

function App() {
  const [animals] = useState(mockAnimals);
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");

  return (
    <main style={{ padding: "20px" }}>
      <h1>Animals List</h1>

      <Filters
        species={species}
        size={size}
        age={age}
        onSpeciesChange={setSpecies}
        onSizeChange={setSize}
        onAgeChange={setAge}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </main>
  );
}

export default App;
