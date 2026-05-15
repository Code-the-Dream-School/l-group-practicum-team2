const MOCK_FAVORITES_KEY = "mockFavorites";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

function getStoredFavoriteIds() {
  try {
    const storedIds =
      JSON.parse(localStorage.getItem(MOCK_FAVORITES_KEY)) || [];
    return storedIds.map(String);
  } catch {
    return [];
  }
}

function saveFavoriteIds(ids) {
  localStorage.setItem(MOCK_FAVORITES_KEY, JSON.stringify(ids.map(String)));
}

export async function fetchFavorites() {
  const response = await fetch(`${BACKEND_API}/api/favorites`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Network response was not ok");
  }
  if (!data) return data;
  return data;
}

export async function addFavorite(animalId) {
  if (await isFavorite(animalId)) {
    throw new Error("Animal is already in favorites");
  }
  const response = await fetch(`${BACKEND_API}/api/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ animal_id: String(animalId) }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to add favorite");
  }
  return data;
}

export async function removeFavorite(animalId) {
  const remove = await isFavorite(animalId);
  if (!remove) {
    throw new Error("Animal is already not in favorites");
  }
  const response = await fetch(`${BACKEND_API}/api/favorites/${animalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ animal_id: String(animalId) }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to add favorite");
  }
  return data;
}

export async function isFavorite(animalId) {
  let animals = await fetchFavorites();
  if (!animals) {
    return false;
  }
  const idArray = animals.map((animal) => String(animal.id));
  return idArray.includes(String(animalId));
}
