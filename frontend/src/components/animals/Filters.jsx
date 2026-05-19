import PropTypes from "prop-types";

function Filters({
  species,
  size,
  age,
  specialNeeds,
  onSpeciesChange,
  onSizeChange,
  onAgeChange,
  onSpecialNeedsChange,
}) {
  return (
    <div className="filters-bar">
      <span className="filters-label" aria-hidden="true">
        Filters
      </span>

      <select
        className="filter-select"
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
        aria-label="Filter by species"
      >
        <option value="">All species</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="rabbit">Rabbit</option>
      </select>

      <select
        className="filter-select"
        value={size}
        onChange={(e) => onSizeChange(e.target.value)}
        aria-label="Filter by size"
      >
        <option value="">Any size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <select
        className="filter-select"
        value={age}
        onChange={(e) => onAgeChange(e.target.value)}
        aria-label="Filter by age"
      >
        <option value="">Any age</option>
        <option value="young">Young</option>
        <option value="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>

      <label
        className={`filter-special-toggle ${specialNeeds ? "active" : ""}`}
      >
        <input
          type="checkbox"
          checked={specialNeeds}
          onChange={(e) => onSpecialNeedsChange(e.target.checked)}
        />
        Special needs
      </label>
    </div>
  );
}

Filters.propTypes = {
  species: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  specialNeeds: PropTypes.bool.isRequired,
  onSpeciesChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onAgeChange: PropTypes.func.isRequired,
  onSpecialNeedsChange: PropTypes.func.isRequired,
};

export default Filters;
