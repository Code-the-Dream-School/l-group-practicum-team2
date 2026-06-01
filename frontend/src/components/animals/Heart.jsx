import PropTypes from "prop-types";
import { useFavorite } from "../../contexts/FavoriteContext";

import { Spinner } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
function Heart({ animalId }) {
  const {
    isFavorite,
    requestToggleFavorite,
    heartLoadingIds,
    favoritesLoading,
  } = useFavorite();
  const favorite = isFavorite(animalId);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    requestToggleFavorite(animalId);
  }

  if (heartLoadingIds.includes(animalId) || favoritesLoading) {
    return (
      <button
        type="button"
        className={`favorite-button`}
        disabled={true}
        style={{ cursor: "not-allowed" }}
      >
        <Spinner animation="border" size="sm" variant="secondary" />
      </button>
    );
  }
  return (
    <button
      type="button"
      className="favorite-button"
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      {favorite ? (
        <HeartFill className="text-danger" />
      ) : (
        <HeartFill className="text-secondary" />
      )}
    </button>
  );
}

Heart.propTypes = {
  animalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Heart;
