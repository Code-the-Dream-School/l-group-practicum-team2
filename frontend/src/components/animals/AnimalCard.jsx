import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatLabel } from "../../utils/formatLabel";
import Heart from "./Heart";

function AnimalCard({ animal }) {
  const isAdopted = animal.status?.toUpperCase() === "ADOPTED";

  return (
    <Link
      to={!isAdopted && `/animals/${animal.id}`}
      className="animal-card-link"
    >
      <article
        className="animal-card"
        style={{
          ...(isAdopted && { backgroundColor: "lightgrey" }),
        }}
      >
        <div className="animal-image-wrap">
          <div className="badges">
            {animal.special_needs && (
              <span className="special-needs-badge">Special Needs</span>
            )}
            {isAdopted && <span className="adopted-badge">Adopted</span>}
          </div>

          {!isAdopted && <Heart animalId={animal.id} />}

          <img
            src={animal.photo_url}
            alt={
              animal.name
                ? `${animal.name}, ${animal.species || "animal"}`
                : "Adoptable animal"
            }
            className="animal-card-image"
          />
        </div>

        <div className="animal-card-body">
          <div className="animal-title-row">
            <h3>{animal.name}</h3>

            <span className="age-pill">{Math.floor(animal.age_years)} yrs</span>
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

AnimalCard.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    special_needs: PropTypes.bool,
    photo_url: PropTypes.string,
    name: PropTypes.string,
    age_years: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    breed: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    age_category: PropTypes.string,
    species: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default AnimalCard;
