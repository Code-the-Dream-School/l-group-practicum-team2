import AnimalCard from "./AnimalCard";
import Filters from "./Filters";
import { mockAnimals } from "../../constants/animals";
import ErrorMessage from "../ErrorMessage";
import { useAnimal } from "../../contexts/AnimalContext";

function AnimalList() {
  const {
    filteredAnimals,
    filters,
    hasActiveFilters,
    updateParam,
    clearFilters,
  } = useAnimal();

  return (
    <div>
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

      {filteredAnimals.length === 0 && (
        <ErrorMessage message="Failed to load animals." />
      )}
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
    </div>
  );
}

export default AnimalList;
