const USE_MOCK = import.meta.env.VITE_USE_MOCK_INQUIRIES === "true";

export async function createInquiry({ animal_id, message }) {
  // Mock-mode, until BE endpoint is noy merged
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      ok: true,
      data: {
        id: `mock-${Date.now()}`,
        animal_id,
        message,
        created_at: new Date().toISOString(),
      },
    };
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ animal_id, message }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.msg || data.message || "Failed to send inquiry. Please try again."
    );
  }

  return { ok: true, data };
}
