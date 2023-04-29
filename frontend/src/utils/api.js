import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://yummy-recipe.fly.dev/api/'
});
