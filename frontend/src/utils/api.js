import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://safe-forest-86784.herokuapp.com/api/'
});
