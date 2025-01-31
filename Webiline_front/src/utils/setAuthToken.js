import apiClient from "./api-client";

const setAuthToken = (token) => {
<<<<<<< HEAD
  if (token) {
    apiClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete apiClient.defaults.headers.common["x-auth-token"];
  }
=======
    if (token) {
        apiClient.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete apiClient.defaults.headers.common["x-auth-token"];
    }
>>>>>>> master
};

export default setAuthToken;
