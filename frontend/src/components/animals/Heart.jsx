import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useFavorite } from "../../contexts/FavoriteContext";

function Heart({ animalId }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } = useFavorite();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (isFavorite(animalId)) {
      handleRemoveFavorite(animalId);
    } else {
      handleAddFavorite(animalId);
    }
  }

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite(animalId) ? "favorited" : ""}`}
      onClick={handleClick}
      aria-label={
        isFavorite(animalId) ? "Remove from favorites" : "Add to favorites"
      }
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
