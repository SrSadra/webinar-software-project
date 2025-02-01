import axios from "axios";
import config from "../config.json";

export default axios.create({
  baseURL: `${config.backendURL}`,
});

// // Add request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     console.log("Request:", {
//       url: config.url,
//       headers: config.headers,
//       method: config.method,
//     });
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", {
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url,
//     });
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
