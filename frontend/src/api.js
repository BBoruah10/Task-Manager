// src/api.js
import axios from "axios";

// Create axios instance pointing at your backend root
export const api = axios.create({
  baseURL: "http://localhost:8080", // your backend root (you said no /api)
  headers: {
    "Content-Type": "application/json",
  },
  // ensure credentials allowed if backend uses cookies (not needed for Bearer but harmless)
  withCredentials: false,
});

// helper to read token from localStorage
function getToken() {
  try {
    const raw = localStorage.getItem("tm_auth"); // we'll store { token, user }
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

// Request interceptor: attach Authorization header automatically
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // add Authorization header if not already set
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global 401 handling (automatic logout)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // if unauthorized, remove token so user is forced to login
    if (err?.response?.status === 401) {
      // best effort: remove auth storage and reload page so UI resets
      localStorage.removeItem("tm_auth");
      // optional: redirect to /signin (only run in browser)
      if (typeof window !== "undefined") {
        // keep it gentle: replace so back-button doesn't re-open protected page
        window.location.replace("/signin");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
