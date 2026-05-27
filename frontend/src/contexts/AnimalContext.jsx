import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { fetchAnimals } from "../services/animalService";
import { useSearchParams } from "react-router-dom";
import { equalsCI } from "../utils/equalsCI";
import { useNotification } from "./NotificationContext";

const AnimalContext = createContext();
export const AnimalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addNotification } = useNotification();

  const getAnimals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAnimals();
      setAnimals(data.animals || []);
    } catch (error) {
      setError(error.message || "Something went wrong while fetching animals");
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while fetching animals: ${error.message}`
          : "Something went wrong while fetching animals"
      );
    } finally {
      setLoading(false);
    }
  },[]);

  const getAnimalById = (id) => {
    return animals.find((animal) => String(animal.id) === String(id)) || null;
  };

  const filters = useMemo(
    () => ({
      species: searchParams.get("species") || "",
      size: searchParams.get("size") || "",
      ageCategory: searchParams.get("age_category") || "",
      specialNeeds: searchParams.get("special_needs") === "true",
    }),
    [searchParams]
  );

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);

    if (value === "" || value === false) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const filteredAnimals = animals.filter((animal) => {
    if (filters.species && !equalsCI(animal.species, filters.species))
      return false;
    if (filters.size && !equalsCI(animal.size, filters.size)) return false;
    if (
      filters.ageCategory &&
      !equalsCI(animal.age_category, filters.ageCategory)
    )
      return false;
    if (filters.specialNeeds && !animal.special_needs) return false;
    return true;
  });

  const specialNeedsAnimals = animals.filter((a) => a.special_needs);

  const hasActiveFilters =
    filters.species !== "" ||
    filters.size !== "" ||
    filters.ageCategory !== "" ||
    filters.specialNeeds;

  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  return (
    <AnimalContext.Provider
      value={{
        animals,
        getAnimalById,
        filteredAnimals,
        specialNeedsAnimals,
        loading,
        error,
        filters,
        updateParam,
        clearFilters,
        hasActiveFilters,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

AnimalProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export const useAnimal = () => useContext(AnimalContext);
