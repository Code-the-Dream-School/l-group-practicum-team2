import type { Animal } from "../types/animal";

type Props = {
  animal: Animal;
};

function AnimalCard({ animal }: Props) {
  return (
    <div
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
      <p>{animal.breed}</p>
      <p>{animal.age_years} years</p>

      <p>
        {animal.age_category.charAt(0) +
          animal.age_category.slice(1).toLowerCase()}
      </p>

      <p>{animal.size.charAt(0) + animal.size.slice(1).toLowerCase()}</p>

      {animal.special_needs && <p style={{ color: "red" }}>Special Needs</p>}
    </div>
  );
}

export default AnimalCard;
