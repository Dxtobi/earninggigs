import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://earninggigs.herokuapp.com/api/'
});
//axios.defaults.baseURL = 'http://localhost:8081/'
const setAuthToken = token => {
  if (token) {
    // Apply to every request
    instance.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;