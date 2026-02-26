import axios from 'axios';

const API_KEY = 'cab23495e9a0aeafb3d127cf804b199a';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'hr-HR'
  }
});

export const movieService = {
  // Osoba 2 koristi ovo za Home Page
  getPopular: async () => {
    const res = await api.get('/movie/popular');
    return res.data.results; // Vraća samo listu filmova
  },
  
  // Osoba 2 koristi ovo za Search
  searchMovies: async (query) => {
    const res = await api.get('/search/movie', { params: { query } });
    return res.data.results;
  },

  // Osoba 3 koristi ovo za Details Page
  getDetails: async (id) => {
    const res = await api.get(`/movie/${id}`);
    return res.data;
  }
};