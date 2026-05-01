type Props = {
  species: string;
  size: string;
  age: string;
  onSpeciesChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onAgeChange: (value: string) => void;
};

function Filters({
  species,
  size,
  age,
  onSpeciesChange,
  onSizeChange,
  onAgeChange,
}: Props) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <select value={species} onChange={(e) => onSpeciesChange(e.target.value)}>
        <option value="">All species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Rabbit">Rabbit</option>
      </select>

      <select value={size} onChange={(e) => onSizeChange(e.target.value)}>
        <option value="">Any size</option>
        <option value="SMALL">Small</option>
        <option value="MEDIUM">Medium</option>
        <option value="LARGE">Large</option>
      </select>

      <select value={age} onChange={(e) => onAgeChange(e.target.value)}>
        <option value="">Any age</option>
        <option value="YOUNG">Young</option>
        <option value="ADULT">Adult</option>
        <option value="SENIOR">Senior</option>
      </select>
    </div>
  );
}

export default Filters;
