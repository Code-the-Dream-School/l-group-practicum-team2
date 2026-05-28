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
import { useNotification } from "./NotificationContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { animals } = useAnimal();
  const { addNotification } = useNotification();

  const isFavorite = useCallback(
    (animalId) => favoriteIds.includes(animalId),
    [favoriteIds]
  );

  const getFavorites = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await fetchFavorites();
      const ids = data.map((f) => f.id) || [];
      setFavoriteIds(ids);
    } catch (error) {
      setError(
        error.message || "Something went wrong while fetching favorites"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddFavorite = async (animalId) => {
    setLoading(true);

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
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (animalId) => {
    setLoading(true);

    try {
      await removeFavorite(animalId);
      setFavoriteIds((prev) => prev.filter((a) => a !== animalId));
      addNotification("success", "Favorite removed successfully");
    } catch (error) {
      setError(
        error.message || "Something went wrong while removing favorites"
      );
    } finally {
      setLoading(false);
    }
  };

  const favoriteAnimals = useMemo(
    () =>
      animals.length === 0
        ? []
        : animals.filter((animal) => favoriteIds.includes(animal.id)),
    [animals, favoriteIds]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        setFavoriteIds([]);
        return;
      }

      getFavorites();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [user, getFavorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteAnimals,
        favoriteIds,
        handleAddFavorite,
        handleRemoveFavorite,
        isFavorite,
        setFavoriteIds,
        loading,
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
