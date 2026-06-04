import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
// Mock the favorite context so `Heart` can render without the provider
vi.mock("../../contexts/FavoriteContext", () => ({
  useFavorite: () => ({
    isFavorite: () => false,
    requestToggleFavorite: () => {},
  }),
}));

const animal = {
  id: 1,
  special_needs: true,
  photo_url:
    "https://firebasestorage.googleapis.com/v0/b/rabbitdb-9370d.appspot.com/o/rabbits%2Fdfc04bca?alt=media&token=2f85e3f8-bbc5-4e7c-bb77-6c637b663369",
  name: "Fluffy",
  age_years: 3,
  breed: "Lop",
  description: "A friendly rabbit looking for a loving home.",
  size: "medium",
  age_category: "adult",
  species: "rabbit",
  status: "ADOPTED",
};
const availableAnimal = {
  ...animal,
  status: "AVAILABLE",
};

const renderWithRouter = (ui) => render(ui, { wrapper: MemoryRouter });

describe("AnimalCard renders fields correctly", () => {
  it("contains an `a` html element", () => {
    renderWithRouter(<AnimalCard animal={availableAnimal} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/animals/1");
    expect(linkElement).toHaveClass("animal-card-link");
  });
  it("contains a Special Needs badge", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const specialNeedsBadge = screen.getByText("Special Needs");
    expect(specialNeedsBadge).toBeInTheDocument();
    expect(specialNeedsBadge).toHaveClass("special-needs-badge");
  });
  it("contains an Adopted badge", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const specialNeedsBadge = screen.getByText("Adopted");
    expect(specialNeedsBadge).toBeInTheDocument();
    expect(specialNeedsBadge).toHaveClass("adopted-badge");
  });
  it("contains a Heart component", () => {
    renderWithRouter(<AnimalCard animal={availableAnimal} />);
    const heartButton = screen.getByRole("button", {
      name: "Add to favorites",
    });
    expect(heartButton).toBeInTheDocument();
    const heartSpan = within(heartButton).getByText("♥");
    expect(heartSpan).toBeInTheDocument();
  });
  it("contains an `img` html element", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", animal.photo_url);
    expect(imgElement).toHaveAttribute(
      "alt",
      `${animal.name}, ${animal.species}`
    );
    expect(imgElement).toHaveClass("animal-card-image");
  });
  it("contains an `h3` html element", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const linkElement = screen.getByRole("heading", {
      level: 3,
      name: animal.name,
    });
    expect(linkElement).toBeInTheDocument();
  });
  it("contains an age pill", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const agePill = screen.getByText(`${Math.floor(animal.age_years)} yrs`);
    expect(agePill).toBeInTheDocument();
    expect(agePill).toHaveClass("age-pill");
  });
  it("contains a breed paragraph", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const breedParagraph = screen.getByText(animal.breed);
    expect(breedParagraph).toBeInTheDocument();
    expect(breedParagraph).toHaveClass("breed");
  });
  it("contains a description paragraph", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const descriptionParagraph = screen.getByText(animal.description);
    expect(descriptionParagraph).toBeInTheDocument();
    expect(descriptionParagraph).toHaveClass("description");
  });
  it("contains tags for size, age category, and species", () => {
    renderWithRouter(<AnimalCard animal={animal} />);
    const sizeTag = screen.getByText("Medium");
    const ageCategoryTag = screen.getByText("Adult");
    const speciesTag = screen.getByText("Rabbit");
    expect(sizeTag).toBeInTheDocument();
    expect(ageCategoryTag).toBeInTheDocument();
    expect(speciesTag).toBeInTheDocument();
    expect(sizeTag.parentElement).toHaveClass("tags");
    expect(ageCategoryTag.parentElement).toHaveClass("tags");
    expect(speciesTag.parentElement).toHaveClass("tags");
  });
});
