import { useState } from "react";

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

  return (
    <main style={{ padding: "20px" }}>
      <h1>Animals List</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {animals.map((animal) => (
          <div
            key={animal.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <img
              src={animal.photo_url}
              alt={animal.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h3>{animal.name}</h3>
            <p>{animal.species}</p>
            <p>{animal.age}</p>
            <p>{animal.size}</p>

            {animal.special_needs && (
              <p style={{ color: "red" }}>Special Needs</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
