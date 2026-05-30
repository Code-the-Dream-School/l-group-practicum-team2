import PropTypes from "prop-types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../services/favoriteService";
import { useAnimal } from "./AnimalContext";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [toggleHeartLoading, setToggleHeartLoading] = useState(false); // handle heart toggle loading
  const [favoritesLoading, setFavoritesLoading] = useState(false); // handle getFavorites loading
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [pendingFavoriteId, setPendingFavoriteId] = useState(null);
  const [error, setError] = useState(null);

  const { user, openLogin } = useAuth();
  const { animals } = useAnimal();
  const { addNotification } = useNotification();

  const isFavorite = useCallback(
    (animalId) => favoriteIds.includes(animalId),
    [favoriteIds]
  );

  const getFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }

    setError(null);
    setFavoritesLoading(true);
    await new Promise((resolve)=>setTimeout(resolve, 3000))
    try {
      const data = await fetchFavorites();
      const ids = data.map((favorite) => favorite.id) || [];

      setFavoriteIds(ids);
    } catch (error) {
      setError(
        error.message || "Something went wrong while fetching favorites"
      );

      addNotification(
        "danger",
        error.message
          ? `An error has occurred while fetching favorites: ${error.message}`
          : "Something went wrong while fetching favorites"
      );
    } finally {
      setFavoritesLoading(false);
    }
  }, [user]);
  const handleAddFavorite = async (animalId) => {
    setToggleHeartLoading(true);

    try {
      await addFavorite(animalId);
      setFavoriteIds((prev) => [...prev, animalId]);
      addNotification("success", "Favorite added successfully");
    } catch (error) {
      setError(error.message || "Something went wrong while adding favorites");
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while adding a favorite: ${error.message}`
          : "Something went wrong while adding a favorite"
      );
    } finally {
      setToggleHeartLoading(false);
    }
  };
  const handleRemoveFavorite = async (animalId) => {
    setToggleHeartLoading(true);

    try {
      await removeFavorite(animalId);
      setFavoriteIds((prev) => prev.filter((a) => a !== animalId));
      addNotification("success", "Favorite removed successfully");
    } catch (error) {
      setError(
        error.message || "Something went wrong while removing favorites"
      );
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while removing a favorite: ${error.message}`
          : "Something went wrong while removing a favorite"
      );
    } finally {
      setToggleHeartLoading(false);
    }
  };

   

  

  const toggleFavorite = useCallback(
    async (animalId) => {
      if (favoriteIds.includes(animalId)) {
        await handleRemoveFavorite(animalId);
      } else {
        await handleAddFavorite(animalId);
      }
    },
    [favoriteIds, handleAddFavorite, handleRemoveFavorite]
  );

  const requestToggleFavorite = async (animalId) => {
    if (!user) {
      setPendingFavoriteId(animalId);
      openLogin();
      return;
    }

    await toggleFavorite(animalId);
  };

  const favoriteAnimals = useMemo(
    () =>
      animals.length === 0
        ? []
        : animals.filter((animal) => favoriteIds.includes(animal.id)),
    [animals, favoriteIds]
  );

  useEffect(() => {
    const loadFavorites = async () => {
      await getFavorites();
    };

    loadFavorites();
  }, [getFavorites]);

  useEffect(() => {
    if (!user || !pendingFavoriteId) return;

    const runPendingFavorite = async () => {
      const animalId = pendingFavoriteId;

      setPendingFavoriteId(null);

      if (favoriteIds.includes(animalId)) {
        return;
      }

      await handleAddFavorite(animalId);
    };

    runPendingFavorite();
  }, [user, pendingFavoriteId, favoriteIds, handleAddFavorite]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteAnimals,
        isFavorite,
        requestToggleFavorite,
        toggleHeartLoading,
        favoritesLoading,
        error,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFavorite = () => useContext(FavoriteContext);
