export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4001"
    : "https://spectral-insights.onrender.com";
