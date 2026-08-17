const API_URL = "http://localhost:5000/api";

export async function analyzeResume(file) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_URL}/resume/analyze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Resume analysis failed");
  }

  return data;
}

export async function getLatestResume() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/resume/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch latest resume");
  }

  return data;
}
