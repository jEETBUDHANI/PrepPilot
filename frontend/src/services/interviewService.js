const API_URL = "http://localhost:5000/api";

export async function createInterview(interviewData) {
  const response = await fetch(`${API_URL}/interviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
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
  const response = await fetch(`${API_URL}/interviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }
  return response.json();
}

export async function getInterviewById(id) {
  const response = await fetch(`${API_URL}/interviews/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch interview details");
  }
  return response.json();
}
