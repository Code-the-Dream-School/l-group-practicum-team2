import PropTypes from "prop-types";

function Filters({
  species,
  size,
  age,
  onSpeciesChange,
  onSizeChange,
  onAgeChange,
}) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <select value={species} onChange={(e) => onSpeciesChange(e.target.value)}>
        <option value="">All species</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="rabbit">Rabbit</option>
      </select>

      <select value={size} onChange={(e) => onSizeChange(e.target.value)}>
        <option value="">Any size</option>
        <option value="small">Small</option>
        <option value="med">Medium</option>
        <option value="large">Large</option>
      </select>

      <select value={age} onChange={(e) => onAgeChange(e.target.value)}>
        <option value="">Any age</option>
        <option value="young">Young</option>
        <option value="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>
    </div>
  );
}

Filters.propTypes = {
  species: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  onSpeciesChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onAgeChange: PropTypes.func.isRequired,
};

export default Filters;
