const API_KEY = "4d18e2d347963823ff19a5f5abca9994";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_PATH = "language=ko-KR&page=1";

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

export function getNowMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&${LANGUAGE_PATH}`
  ).then((response) => response.json());
}
