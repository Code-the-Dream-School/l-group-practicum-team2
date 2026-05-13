export async function fetchAnimalById(id) {
  const response = await fetch(`/api/animals/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch animal");
  }

  const data = await response.json();
  return data;
}
