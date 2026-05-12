const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

//FILM

export async function getPopularMovies() {
  const risposta = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT`);
  const dati = await risposta.json();
  return dati.results; 
}


export async function getMovieDetails(movieId) {
  const risposta = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=it-IT`);
  const dati = await risposta.json();
  return dati;
}


export async function getGenres() {
  const risposta = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=it-IT`);
  const dati = await risposta.json();
  return dati.genres;
}


export function getImageUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

//SERIE TV

export async function getPopularTV() {
  const risposta = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=it-IT`);
  const dati = await risposta.json();
  return dati.results; 
}


export async function getTVDetails(tvId) {
  const risposta = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=it-IT`);
  return await risposta.json();
}

export async function getTVGenres() {
  const risposta = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=it-IT`);
  const dati = await risposta.json();
  return dati.genres;
}