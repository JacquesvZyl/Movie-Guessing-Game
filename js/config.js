export const TOTAL_PAGES = 10;
export const NUM_TILES_IN_ROW = 6;
export const TILES_SYMBOL = "?";
export const PAGES_MIN = 1;
export const PAGES_MAX = 50;
export const TIMEOUT_SEC = 5;
export const SUBMIT_ERROR_TIMEOUT_SEC = 0.9;
export const FORMAT = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|’,.<>\/?~]/;
export const SCORE_VALUES = {
  ANSWER_VALUE: 100,
  TOTAL_QUESTIONS: 10,
  TILE_DEDUCTIONS: 10,
  SYNOPSIS_DEDUCTIONS: 20,
  CAST_DEDUCTIONS: 10,
  SUBMIT_DEDUCTIONS: 20,
  RELEASEDATE_DEDUCTIONS: 5,
};
export const API_DATA = {
  API_KEY: "a7181f2ad447e5c2b19cc987dd2cd250",
  URL: "https://api.themoviedb.org/3/",
  DISCOVER_MOVIE: "discover/movie?",
  POPULAR: "movie/popular?",
  RELEASE_YEAR: "primary_release_year=",
  IMG_BASE: "https://image.tmdb.org/t/p/w300",
  LANGUAGE: "language=en-US",
  CREDITS: "/credits?",
  GENRES: "/genre/movie/list",
};
