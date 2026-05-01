function formatLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AnimalCard({ animal }) {
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
          <span>{formatLabel(animal.species)}</span>
        </div>

        {animal.special_needs && <p className="special-needs">Special Needs</p>}
      </div>
    </article>
  );
}
