import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 这里直接写 import.meta.env.VITE_API_URL
  timeout: 30000,
});

export default instance;
