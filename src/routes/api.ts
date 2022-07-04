const API_KEY = "4d18e2d347963823ff19a5f5abca9994";
const BASE_PATH = "https://api.themoviedb.org/3";

interface INowMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IGetNowMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: INowMovie[];
  total_pages: number;
  total_results: number;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IGetMoiveDetail {
  backdrop_path: string;
  homepage: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  genres: IGenres[];
}

export function getNowMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
// https://api.themoviedb.org/3/movie/453395?api_key=4d18e2d347963823ff19a5f5abca9994
// https://api.themoviedb.org/3/genre/tv/list?api_key=%5BMY_KEY%5D&language=en-US
