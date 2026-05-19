import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { fetchFavorites, addFavorite, removeFavorite} from "../services/favoriteService";

const FavoriteContext = createContext();
const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

export const FavoriteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);


  const getFavorites = async () => {
    setLoading(true);

    try {
      const data = await fetchFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      setError(error.message || "Something went wrong while fetching favorites");
    } finally {
      setLoading(false);
    }
  };
  const handleAddFavorite = async (animalId) => {
    setLoading(true);

    try {
      const data = await addFavorite(animalId);
      setFavorites(prev => [...prev, animalId]);
    } catch (error) {
      setError(error.message || "Something went wrong while adding favorites");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFavorite = async (animalId) => {
    setLoading(true);

    try {
      const data = await removeFavorite(animalId);
      setFavorites(perv => prev.filter(a => a !== animalId));
    } catch (error) {
      setError(error.message || "Something went wrong while removing favorites");
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    getFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        handleAddFavorite,
        handleRemoveFavorite,
        loading,
        error,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
