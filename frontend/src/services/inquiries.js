const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

export async function getUserInquiries(userId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }
  const response = await fetch(
    `${BACKEND_API}/api/inquiries?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.msg || data.message || "Failed to fetch inquiries. Please try again."
    );
  }
  return { ok: true, data };
}

export async function addInquiry({ animalId, message }) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }
  const response = await fetch(`${BACKEND_API}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ animal_id: animalId, message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.msg || data.message || "Failed to send inquiry. Please try again."
    );
  }
  return { ok: true, data };
}
