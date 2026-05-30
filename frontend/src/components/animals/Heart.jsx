import PropTypes from "prop-types";
import { useFavorite } from "../../contexts/FavoriteContext";
import { Spinner } from "react-bootstrap";
function Heart({ animalId }) {
  const { isFavorite, requestToggleFavorite, heartLoadingIds } = useFavorite();
  const favorite = isFavorite(animalId);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    requestToggleFavorite(animalId);
  }

  if(heartLoadingIds.includes(animalId)){
    return (
      <button
        type="button"
        className={`favorite-button`}
        disabled={true}
        style={{cursor: 'not-allowed'}}

      >
        <Spinner animation="border" size="sm" />
      </button>
    )
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
