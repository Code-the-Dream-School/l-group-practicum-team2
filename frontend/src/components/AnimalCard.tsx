type Animal = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age_years: number;
  age_category: string;
  size: string;
  special_needs: boolean;
  photo_url: string;
  status: string;
};

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="animal-card">
      <div className="animal-image-wrap">
        <img
          src={animal.photo_url}
          alt={animal.name}
          className="animal-image"
        />
      </div>
      <div className="animal-card-body">
        <div className="animal-title-row">
          <h3>{animal.name}</h3>
          <span className="age-pill">{animal.age_years} yrs</span>
        </div>
        <p className="breed">{animal.breed}</p>
        <p className="description">
          Friendly companion looking for a loving home and a caring family.
        </p>

        <div className="tags">
          <span>{formatLabel(animal.size)}</span>
          <span>{formatLabel(animal.age_category)}</span>
          <span>{animal.species}</span>
        </div>

        {animal.special_needs && <p className="special-needs">Special Needs</p>}
      </div>
    </article>
  );
}
