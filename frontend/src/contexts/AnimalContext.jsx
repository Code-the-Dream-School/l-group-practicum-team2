import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAnimals } from "../services/AnimalService";
const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  const getAnimals = async () => {
    setLoading(true);

    try {
      const data = fetchAnimals();
      setAnimals(data.animals || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong while fetching animals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <AnimalContext.Provider value={{ animals, loading, error }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimal = () => useContext(AnimalContext);
