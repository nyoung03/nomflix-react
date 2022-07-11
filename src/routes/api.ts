const API_KEY = "4d18e2d347963823ff19a5f5abca9994";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IGetMovies {
  results: IMovie[];
}

export function getNowMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTopMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

interface ITv {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: 8.4;
}

export interface IGetTvs {
  results: ITv[];
}

export function getOnAirTv() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getPoPularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getAiringTodayTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

// Detail
interface IMovieGenres {
  id: number;
  name: string;
}

export interface IGetMoiveDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  genres: IMovieGenres[];
  overview: string;
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

interface ITvGenres {
  id: number;
  name: string;
}

export interface IGetTvDetail {
  backdrop_path: string;
  first_air_date: string;
  genres: ITvGenres[];
  id: number;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  poster_path: string;
  overview: string;
}

export function getTvDetail(tvId: string) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}
