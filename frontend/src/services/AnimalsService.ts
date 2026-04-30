const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface ShelterInfo {
  name: string;
  city: string;
  email: string;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  ageYears: number | null;
  ageCategory: string;
  size: string;
  specialNeeds: boolean;
  temperament: string;
  description: string;
  photoUrl: string;
  status: string;
  shelter: ShelterInfo;
}

interface RawAnimal {
  id?: string;
  name?: string;
  species?: string;
  breed?: string;
  age_years?: number | string | null;
  ageYears?: number | string | null;
  age_category?: string;
  ageCategory?: string;
  size?: string;
  special_needs?: boolean;
  specialNeeds?: boolean;
  temperament?: string;
  description?: string;
  photo_url?: string;
  photoUrl?: string;
  status?: string;
  shelter?: {
    name?: string;
    city?: string;
    email?: string;
    contact_email?: string;
  };
  shelter_name?: string;
  shelter_city?: string;
  shelter_email?: string;
}

export const normalizeAnimal = (rawAnimal: RawAnimal): Animal => {
  const shelter = rawAnimal.shelter || {};

  const ageValue = rawAnimal.age_years ?? rawAnimal.ageYears ?? null;

  return {
    id: rawAnimal.id || "",
    name: rawAnimal.name || "Unknown animal",
    species: rawAnimal.species || "",
    breed: rawAnimal.breed || "",
    ageYears:
      ageValue !== null && ageValue !== undefined && ageValue !== ""
        ? Number(ageValue)
        : null,
    ageCategory: rawAnimal.age_category ?? rawAnimal.ageCategory ?? "",
    size: rawAnimal.size || "",
    specialNeeds: Boolean(
      rawAnimal.special_needs ?? rawAnimal.specialNeeds ?? false
    ),
    temperament: rawAnimal.temperament || "",
    description: rawAnimal.description || "",
    photoUrl: rawAnimal.photo_url || rawAnimal.photoUrl || "",
    status: rawAnimal.status || "",
    shelter: {
      name: shelter.name || rawAnimal.shelter_name || "—",
      city: shelter.city || rawAnimal.shelter_city || "—",
      email:
        shelter.email ||
        shelter.contact_email ||
        rawAnimal.shelter_email ||
        "—",
    },
  };
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  const response = await fetch(`${API_BASE_URL}/api/animals/${id}`);

  if (response.status === 404) {
    const error = new Error("Animal not found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }

  if (!response.ok) {
    const error = new Error(
      "Failed to fetch animal details"
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const result = await response.json();
  const rawAnimal = result?.data || result?.animal || result;

  return normalizeAnimal(rawAnimal);
};
