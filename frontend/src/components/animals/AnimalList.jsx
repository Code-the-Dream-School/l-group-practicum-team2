import AnimalCard from "./AnimalCard";
import Filters from "./Filters";

import { useAnimal } from "../../contexts/AnimalContext";

import AnimalListSkeleton from "./AnimalListSkeleton";

function AnimalList() {
  const {
    filteredAnimals,
    filters,
    hasActiveFilters,
    updateParam,
    clearFilters,
    loading,
  } = useAnimal();

  if (loading) {
    return (
      <main className="app" style={{ width: "100%" }}>
        {/* <h1>Animals List</h1> */}

        <AnimalListSkeleton />
      </main>
    );
  }
  return (
    <main className="app">
      <h1>Animals List</h1>

      <Filters
        species={filters.species}
        size={filters.size}
        age={filters.ageCategory}
        specialNeeds={filters.specialNeeds}
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
