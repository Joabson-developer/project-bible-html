export const BASE_URL_API =
  window.location.origin.includes("localhost") ||
  window.location.origin.includes("127.0.0.1")
    ? "http://localhost:5001/api"
    : "https://bible-api-git-master-joabsondevelopers-projects.vercel.app/api"
