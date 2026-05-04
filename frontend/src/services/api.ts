const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getHelloMessage() {
    const response = await fetch(`${API_BASE_URL}/api/hello`);

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error || "Failed to fetch from backend")
    }

    return data;
}