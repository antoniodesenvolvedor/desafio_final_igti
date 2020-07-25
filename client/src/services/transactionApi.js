import axios from "axios";

const api = axios.create({
  baseURL: "https://fast-plains-48786.herokuapp.com/",
});

export default api;
