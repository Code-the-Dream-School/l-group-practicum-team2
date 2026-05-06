import { Link } from "react-router-dom";
import { formatLabel } from "../../utils/formatLabel";

export default function AnimalCard({ animal }) {
  return (
    <Link to={`/animals/${animal.id}`} className="animal-card-link">
      <article className="animal-card">
        <div className="animal-image-wrap">
          {animal.special_needs && (
            <span className="special-needs-badge">Special Needs</span>
          )}
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
            {animal.description ||
              "Friendly companion looking for a loving home and a caring family."}
          </p>

          <div className="tags">
            <span>{formatLabel(animal.size)}</span>
            <span>{formatLabel(animal.age_category)}</span>
            <span>{formatLabel(animal.species)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}