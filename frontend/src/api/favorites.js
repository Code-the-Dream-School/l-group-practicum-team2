const FAVORITES_KEY = "mockFavorites";

function getStoredFavoriteIds() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavoriteIds(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function getFavorites() {
  return getStoredFavoriteIds();
}

export function addFavorite(animalId) {
  const ids = getStoredFavoriteIds();

  if (!ids.includes(animalId)) {
    saveFavoriteIds([...ids, animalId]);
  }
}

export function removeFavorite(animalId) {
  const ids = getStoredFavoriteIds();
  saveFavoriteIds(ids.filter((id) => id !== animalId));
}
