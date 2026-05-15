const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

export const fetchAnimals = async () => {
  try {
    const response = await fetch(
      `${BACKEND_API}/api/animals?status=available`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch animals");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Network error");
  }
};
