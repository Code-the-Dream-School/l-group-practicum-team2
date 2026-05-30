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
  const [heartLoadingIds, setHeartLoadingIds] = useState([]); // handle heart toggle loading
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
      return ids;
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
  }, [user, addNotification]);

  const handleAddFavorite = useCallback(async (animalId) => {
    setHeartLoadingIds(prev => [...prev, animalId]);

    try {
      await addFavorite(animalId);
      setFavoriteIds((prev) => [...prev, animalId]);
      addNotification("success", "Favorite added successfully");
    } catch (error) {
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while adding a favorite: ${error.message}`
          : "Something went wrong while adding a favorite"
      );
    } finally {
      setHeartLoadingIds(prev => prev.filter(id => id !== animalId));
    }
  }, [addNotification]);

  const handleRemoveFavorite = useCallback(async (animalId) => {
    setHeartLoadingIds(prev => [...prev, animalId]);

    try {
      await removeFavorite(animalId);
      setFavoriteIds((prev) => prev.filter((a) => a !== animalId));
      addNotification("success", "Favorite removed successfully");
    } catch (error) {
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while removing a favorite: ${error.message}`
          : "Something went wrong while removing a favorite"
      );
    } finally {
      setHeartLoadingIds(prev => prev.filter(id => id !== animalId));
    }
  },[addNotification]);

  const toggleFavorite = useCallback(async (animalId) => {
  
    if (isFavorite(animalId)) await handleRemoveFavorite(animalId);
    else await handleAddFavorite(animalId);
  }, [isFavorite, handleAddFavorite, handleRemoveFavorite]);

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
<<<<<<< HEAD
    const loadFavorites = async () => {
      await getFavorites();
    };

    loadFavorites();
  }, [getFavorites]);
=======
>>>>>>> a3f46c87 (combine useEffects to eliminate post-login race condition)

  if (!user) {
    setFavoriteIds([]);
    return;
  }
  const run = async () => {
    const favoriteIdsArray = await getFavorites();

<<<<<<< HEAD
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
=======
    if(pendingFavoriteId){
      const id = pendingFavoriteId;
      setPendingFavoriteId(null);

      if(!favoriteIdsArray.includes(id))
        await handleAddFavorite(targetId);
    }
  }
  run();
}, [getFavorites, user, pendingFavoriteId, handleAddFavorite]);
>>>>>>> a3f46c87 (combine useEffects to eliminate post-login race condition)

  
  return (
    <FavoriteContext.Provider
      value={{
        favoriteAnimals,
        isFavorite,
        requestToggleFavorite,
        heartLoadingIds,
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
