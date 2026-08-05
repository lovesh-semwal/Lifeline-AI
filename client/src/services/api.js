import axios from "axios";

const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";

const API = axios.create({
  baseURL: (isLocal 
    ? "http://localhost:5000" 
    : process.env.NEXT_PUBLIC_API_URL || "https://lifeline-ai-backend-9yj5.onrender.com"
  ) + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
