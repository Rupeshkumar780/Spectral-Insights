export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ?  "https://spectral-insights.onrender.com"
    : "http://localhost:4001";
