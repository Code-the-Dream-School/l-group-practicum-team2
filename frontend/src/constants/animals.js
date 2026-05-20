// Mock animals used as a fallback until the backend endpoints are wired up.
// Shelter info lives on flat fields (shelter_name / shelter_city / etc.) so it
// matches the shape ShelterInfo expects from AnimalContext once the refactor
// to merge animal + shelter data on the server lands.
export const mockAnimals = [
  {
    id: "1",
    name: "Bella",
    species: "dog",
    breed: "Labrador",
    age_years: 4,
    age_category: "adult",
    size: "med",
    temperament: ["friendly", "gentle", "playful"],
    description:
      "Bella is a sweet and loyal Labrador who loves people and enjoys calm walks, toys, and cozy naps.",
    special_needs: true,
    photo_url: "https://placedog.net/600/400?id=1",
    status: "available",
    shelter_name: "Happy Tails Shelter",
    shelter_city: "Boston",
    shelter_email: "hello@happytails.org",
    shelter_phone: "(617) 555-0142",
  },
  {
    id: "2",
    name: "Max",
    species: "cat",
    breed: "Siamese",
    age_years: 10,
    age_category: "senior",
    size: "small",
    temperament: ["calm", "curious", "affectionate"],
    description:
      "Max is a calm senior cat who enjoys sunny windows, quiet company, and a predictable routine.",
    special_needs: true,
    photo_url:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    status: "available",
    shelter_name: "City Pet Rescue",
    shelter_city: "Chicago",
    shelter_email: "adopt@citypetrescue.org",
    shelter_phone: "(312) 555-0188",
  },
  {
    id: "3",
    name: "Charlie",
    species: "dog",
    breed: "Beagle",
    age_years: 1,
    age_category: "young",
    size: "large",
    temperament: ["energetic", "social", "happy"],
    description:
      "Charlie is a young Beagle with lots of energy. He loves outdoor play, treats, and meeting new people.",
    special_needs: false,
    photo_url: "https://placedog.net/600/400?id=2",
    status: "available",
    shelter_name: "Green Valley Shelter",
    shelter_city: "Denver",
    shelter_email: "contact@greenvalleyshelter.org",
    shelter_phone: "(303) 555-0173",
  },
  {
    id: "4",
    name: "Luna",
    species: "rabbit",
    breed: "Holland Lop",
    age_years: 2,
    age_category: "adult",
    size: "small",
    temperament: ["gentle", "quiet", "sweet"],
    description:
      "Luna is a gentle rabbit who enjoys a calm environment, fresh greens, and soft bedding.",
    special_needs: false,
    photo_url:
      "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg",
    status: "available",
    shelter_name: "Little Paws Haven",
    shelter_city: "Seattle",
    shelter_email: "info@littlepawshaven.org",
    shelter_phone: "(206) 555-0119",
  },
];
