const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const option =  {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  }}
//FILM

export async function getPopularMovies() {
  const risposta = await fetch(`${BASE_URL}/movie/popular?language=it-IT`, option)
  const dati = await risposta.json();
  console.log(dati.results)
  return dati.results; 
}


export async function getMovieDetails(movieId) {
  const risposta = await fetch(`${BASE_URL}/movie/${movieId}?language=it-IT`, option);
  const dati = await risposta.json();
  return dati;
}


export async function getGenres() {
  const risposta = await fetch(`${BASE_URL}/genre/movie/list?language=it-IT`, option);
  const dati = await risposta.json();
  return dati.genres;
}


export function getImageUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

//SERIE TV

export async function getPopularTV() {
  const risposta = await fetch(`${BASE_URL}/tv/popular?language=it-IT`, option);
  const dati = await risposta.json();
  return dati.results; 
}


export async function getTVDetails(tvId) {
  const risposta = await fetch(`${BASE_URL}/tv/${tvId}?language=it-IT`, option);
  return await risposta.json();
}

export async function getTVGenres() {
  const risposta = await fetch(`${BASE_URL}/genre/tv/list?language=it-IT`, option);
  const dati = await risposta.json();
  return dati.genres;
}