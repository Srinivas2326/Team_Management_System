import axios from "axios";

const API = axios.create({
  baseURL: "https://team-management-system-ku5a.onrender.com/api"
});

export default API;