// HTTP client configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getToken() {
  return localStorage.getItem("mx_token");
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const token = getToken();

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const http = {
  get: (path) => request(path),
  post: (path, body, options = {}) =>
    request(path, { method: "POST", body: JSON.stringify(body), ...options }),
  patch: (path, body, options = {}) =>
    request(path, { method: "PATCH", body: JSON.stringify(body), ...options }),
};

export { BASE_URL };

