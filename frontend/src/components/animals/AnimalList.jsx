import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import Filters from "./Filters";

import { useAnimal } from '../../contexts/AnimalContext'

function AnimalList() {
  const {animals} = useAnimal();
  const [searchParams, setSearchParams] = useSearchParams();

  const species = searchParams.get("species") || "";
  const size = searchParams.get("size") || "";
  const ageCategory = searchParams.get("age_category") || "";
  const specialNeeds = searchParams.get("special_needs") === "true";

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

  const hasActiveFilters =
    species !== "" || size !== "" || ageCategory !== "" || specialNeeds;

  const equalsCI = (a, b) => a?.toLowerCase() === b?.toLowerCase();

  const filteredAnimals = animals.filter((animal) => {
    if (species && !equalsCI(animal.species, species)) return false;
    if (size && !equalsCI(animal.size, size)) return false;
    if (ageCategory && !equalsCI(animal.age_category, ageCategory))
      return false;
    if (specialNeeds && !animal.special_needs) return false;
    return true;
  });

  return (
    <main className="app">
      <h1>Animals List</h1>

      <Filters
        species={species}
        size={size}
        age={ageCategory}
        specialNeeds={specialNeeds}
        onSpeciesChange={(v) => updateParam("species", v)}
        onSizeChange={(v) => updateParam("size", v)}
        onAgeChange={(v) => updateParam("age_category", v)}
        onSpecialNeedsChange={(v) => updateParam("special_needs", v)}
      />

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="filter-clear-btn"
        >
          Clear filters
        </button>
      )}

      {filteredAnimals.length === 0 ? (
        <p>No animals match these filters.</p>
      ) : (
        <div className="animals-grid">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </main>
  );
}

export default AnimalList;
