import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth Header
    delete axios.defaults.headers.common['Authorization'];
  }
};