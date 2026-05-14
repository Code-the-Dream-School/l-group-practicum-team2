import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addFavorite, removeFavorite } from "../../services/favorites";

function Heart({ animalId, initialFavorite = false }) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (favorite) {
      removeFavorite(animalId);
      setFavorite(false);
    } else {
      addFavorite(animalId);
      setFavorite(true);
    }
  }

  return (
    <button
      type="button"
      className={`favorite-button ${favorite ? "favorited" : ""}`}
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <span>♥</span>
    </button>
  );
}

Heart.propTypes = {
  animalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  initialFavorite: PropTypes.bool,
};

export default Heart;
