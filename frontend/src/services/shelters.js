// Fetches a single shelter by id from the API.
// Mirrors the pattern in services/animals.js so the detail page stays clean.
export async function fetchShelterById(id) {
  const response = await fetch(`/api/shelters/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch shelter");
  }

  const data = await response.json();
  return data;
}
