import PropTypes from "prop-types";
import { useFavorite } from "../../contexts/FavoriteContext";

function Heart({ animalId }) {
  const { isFavorite, requestToggleFavorite } = useFavorite();
  const favorite = isFavorite(animalId);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    requestToggleFavorite(animalId);
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
};

export default Heart;
