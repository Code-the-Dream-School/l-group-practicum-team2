import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useFavorite } from "../../context/favoriteContext";
import { useAuth } from "../../context/authContext";

// user's  favorites
// [ 
// 	{
// 		"id": "bd74582f-262c-4429-a975-271b91b01635",
// 	},
// 	{
// 		"id": "c8d91d82-232f-4383-bf62-cbbc5a69d1c2",
// 	},
// 	{
// 		"id": "6142e474-d91f-4940-b84b-d7a0e3e2a6df",
// 	},
// 	{
// 		"id": "4bc45f9c-e0c7-40c9-a3b3-5fbe64fb8bf3",
// 	}
// ]
function Heart({ animalId }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const { currentUser } = useAuth();
const navigate = useNavigate();
  const favorite = isFavorite(animalId);


  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (favorite) {
      removeFavorite(animalId);
    } else {
      addFavorite(animalId);
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
  // initialFavorite: PropTypes.bool,
};

export default Heart;
