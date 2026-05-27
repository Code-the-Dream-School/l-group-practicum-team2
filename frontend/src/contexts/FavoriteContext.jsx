import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import { useAuth } from "./AuthContext";
import { useAnimal } from "./AnimalContext";
import { useNotification } from "./NotificationContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const data = await fetchFavorites();
      const ids = data.map((f) => f.id) || [];
      setFavoriteIds(ids);
    } catch (error) {
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while fetching favorites: ${error.message}`
          : "Something went wrong while fetching favorites"
      );
    } finally {
      setLoading(false);
    }
  }, [user]);
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
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while removing a favorite: ${error.message}`
          : "Something went wrong while removing a favorite"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (animalId) => {
    if (isFavorite(animalId)) await handleRemoveFavorite(animalId);
    else await handleAddFavorite(animalId);
  };

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

    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    if (!user || !pendingFavoriteId) return;

    const run = async () => {
      await toggleFavorite(pendingFavoriteId);
      setPendingFavoriteId(null);
    };

    run();
  }, [user, pendingFavoriteId, toggleFavorite]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteAnimals,
        favoriteIds,
        handleAddFavorite,
        handleRemoveFavorite,
        isFavorite,
        setFavoriteIds,
        requestToggleFavorite,
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
