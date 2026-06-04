import { describe, expect, it, vi } from "vitest";
import Filters from "./Filters";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const onSpeciesChange = vi.fn();
const onSizeChange = vi.fn();
const onAgeChange = vi.fn();
const onSpecialNeedsChange = vi.fn();

const props = {
  species: "dog",
  size: "medium",
  age: "YOUNG",
  specialNeeds: true,
  onSpeciesChange,
  onSizeChange,
  onAgeChange,
  onSpecialNeedsChange,
};

describe("Filter controls calls OnChange correctly", () => {
  it("calls onSpeciesChange when species is changed", async () => {
    const user = userEvent.setup();
    render(<Filters {...props} />);
    const speciesSelect = screen.getByLabelText("Filter by species");
    await user.selectOptions(speciesSelect, "cat");
    expect(onSpeciesChange).toHaveBeenCalled();
  });
  it("calls onSizeChange when size is changed", async () => {
    const user = userEvent.setup();
    render(<Filters {...props} />);
    const sizeSelect = screen.getByLabelText("Filter by size");
    await user.selectOptions(sizeSelect, "small");
    expect(onSizeChange).toHaveBeenCalled();
  });
  it("calls onAgeChange when age is changed", async () => {
    const user = userEvent.setup();
    render(<Filters {...props} />);
    const ageSelect = screen.getByLabelText("Filter by age");
    await user.selectOptions(ageSelect, "YOUNG");
    expect(onAgeChange).toHaveBeenCalled();
  });
  it("calls onSpecialNeedsChange when checkbox is toggled", async () => {
    const user = userEvent.setup();
    render(<Filters {...props} />);
    const specialNeedsCheckbox = screen.getByRole("checkbox", {
      name: /special needs/i,
    });
    await user.click(specialNeedsCheckbox);
    expect(onSpecialNeedsChange).toHaveBeenCalled();
  });
});
