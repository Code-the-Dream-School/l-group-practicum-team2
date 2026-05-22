import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import { useAuth } from "./AuthContext";
import { useAnimal } from "./AnimalContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);
  const { user } = useAuth();
  const { animals } = useAnimal();

  const isFavorite = (animalId) => favoriteIds.includes(animalId);

  const getFavorites = async () => {
    setLoading(true);

    try {
      const data = await fetchFavorites();
      const ids = data.map((f) => f.id) || [];
      setFavoriteIds(ids);
      setFavoriteAnimals(animals.filter((animal) => ids.includes(animal.id)));
    } catch (error) {
      setError(
        error.message || "Something went wrong while fetching favorites"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleAddFavorite = async (animalId) => {
    setLoading(true);

    try {
      await addFavorite(animalId);
      setFavoriteIds((prev) => [...prev, animalId]);
    } catch (error) {
      setError(error.message || "Something went wrong while adding favorites");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFavorite = async (animalId) => {
    setLoading(true);

    try {
      await removeFavorite(animalId);
      setFavoriteIds((prev) => prev.filter((a) => a !== animalId));
    } catch (error) {
      setError(
        error.message || "Something went wrong while removing favorites"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, [user]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteAnimals,
        handleAddFavorite,
        handleRemoveFavorite,
        isFavorite,
        loading,
        error,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
