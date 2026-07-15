import axios from "axios";

const api = axios.create({
  baseURL: "https://estate-backend-1xrm.onrender.com/api",
  withCredentials: true,
});
//
export default api;
// ("https://estate-backend-1xrm.onrender.com/api");
