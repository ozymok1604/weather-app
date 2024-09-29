// src/services/apiService.js

import axios from "axios";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  withCredentials: true,
});

//lat={lat}&lon={lon}

// Method to set authorization token
const setAuthToken = (token) => {
  if (!token) {
    delete apiClient.defaults.headers.Authorization;
  } else {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

// Exported methods
export const get = (url: string) => {
  return apiClient.get(url + `&appid=ce767c132de6a62ff022bc27e0f2544e`);
};

export default {
  setAuthToken,
  get,
};
