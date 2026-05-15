const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw new Error(error.message || "Unable to connect to the server");
  }
}

export async function loginUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw new Error(error.message || "Unable to connect to the server");
  }
}

export const fetchCurrentUser = async () => {
  if (!localStorage.getItem("token")) return null;

  // await new Promise((resolve)=>setTimeout(resolve, 2000))
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch current user");
    }

    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw new Error(error.message || "Unable to connect to the server");
  }
};
