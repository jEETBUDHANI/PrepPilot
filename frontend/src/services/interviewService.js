const API_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createInterview(interviewData) {
  const response = await fetch(`${API_URL}/interviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(interviewData),
  });
  if (!response.ok) {
    throw new Error("Failed to create interview");
  }
  return response.json();
}

export async function evaluateInterview(interviewId, role, answers) {
  const response = await fetch(`${API_URL}/interviews/evaluate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      interviewId,
      role,
      answers,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to evaluate interview");
  }
  return response.json();
}

export async function getInterviews() {
  const response = await fetch(`${API_URL}/interviews`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }
  return response.json();
}

export async function getInterviewById(id) {
  const response = await fetch(`${API_URL}/interviews/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch interview details");
  }
  return response.json();
}

export async function getPerformance() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/performance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch performance");
  }
  return response.json();
}
