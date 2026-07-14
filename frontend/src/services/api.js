import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});
// "https://estate-backend-1xrm.onrender.com/api"
export default api;
