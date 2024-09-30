// src/services/apiService.js

import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  withCredentials: true,
});

// Exported methods
export const get = (url: string) => {
  return apiClient.get(url + `&appid=ce767c132de6a62ff022bc27e0f2544e`);
};

export default {
  get,
};
