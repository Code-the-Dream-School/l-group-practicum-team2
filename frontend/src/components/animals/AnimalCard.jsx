import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatLabel } from "../../utils/formatLabel";
import { addFavorite, removeFavorite } from "../../api/favorites";

function AnimalCard({ animal, isFavorite = false }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigate();

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (favorite) {
      removeFavorite(animal.id);
      setFavorite(false);
    } else {
      addFavorite(animal.id);
      setFavorite(true);
    }
  
  }
  return (
    <Link to={`/animals/${animal.id}`} className="animal-card-link">
      <article className="animal-card">
        <div className="animal-image-wrap">
          {animal.special_needs && (
            <span className="special-needs-badge">Special Needs</span>
          )}

        <button
          type="button"
          className={`favorite-button ${favorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span>♥</span>
        </button>


          <img
            src={animal.photo_url}
            alt={animal.name || "Animal photo"}
            className="animal-card-image"
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
  }).isRequired,
};

export default AnimalCard;
