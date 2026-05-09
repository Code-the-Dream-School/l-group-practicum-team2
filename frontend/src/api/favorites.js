const FAVORITES_KEY = "mockFavorites";

function getStoredFavoriteIds() {
  try {
    const storedIds = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    return storedIds.map(String);
  } catch {
    return [];
  }
}

function saveFavoriteIds(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids.map(String)));
}

export function getFavorites() {
  return getStoredFavoriteIds();
}

export function addFavorite(animalId) {
  const ids = getStoredFavoriteIds();
  const favoriteId = String(animalId);

  if (!ids.includes(favoriteId)) {
    saveFavoriteIds([...ids, favoriteId]);
  }
}

export function removeFavorite(animalId) {
  const ids = getStoredFavoriteIds();
  const favoriteId = String(animalId);

  saveFavoriteIds(ids.filter((id) => id !== favoriteId));
}
