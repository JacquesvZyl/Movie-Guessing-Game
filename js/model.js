import {
  API_DATA,
  PAGES_MIN,
  PAGES_MAX,
  TOTAL_PAGES,
  SCORE_VALUES,
} from "./config.js";
import * as helpers from "./helpers.js";

export const state = {
  currentMovie: {},
  allMovies: [],
  pages: [],
  totalPoints: 0,
  currentPoints: 0,
  answerValue: 0,
  currentQuestion: 0,
  pointsOutOf: 0,
  gameOver: false,
};

export async function getAllMovies() {
  try {
    getAllApiPages();

    for (const page of state.pages) {
      //prettier ignore
      const url = `${API_DATA.URL}${API_DATA.POPULAR}&api_key=${API_DATA.API_KEY}&${API_DATA.LANGUAGE}&page=${page}`;
      const data = await movieApiCall(url);
      filterEnglishMovies(data.results);
    }
  } catch (err) {
    throw err;
  }

  //filterEnglishMovies();
}

export function resetScores() {
  state.totalPoints =
    state.currentPoints =
    state.currentQuestion =
    state.pointsOutOf =
      0;
}

export function setQuestionNum() {
  state.currentQuestion++;
}

function addToTotalPossiblePoints() {
  state.pointsOutOf += SCORE_VALUES.ANSWER_VALUE;
}

function getAllApiPages() {
  state.pages.push(helpers.random(PAGES_MIN, PAGES_MAX));
  while (state.pages.length < TOTAL_PAGES) {
    let page = helpers.random(PAGES_MIN, PAGES_MAX);
    !state.pages.includes(page)
      ? state.pages.push(page)
      : (page = helpers.random(PAGES_MIN, PAGES_MAX));
  }
}

async function movieApiCall(url) {
  try {
    return await helpers.getJson(url);
  } catch (err) {
    console.log(err);
  }
}

export function returnRandomMovie() {
  const randomIndex = helpers.random(0, state.allMovies.length - 1);
  state.currentMovie = state.allMovies[randomIndex];
  state.allMovies.splice(randomIndex, 1);
  addToTotalPossiblePoints();
}

export function removePoints(points) {
  if (!state.answerValue > 0) return;
  state.answerValue =
    state.answerValue - points < 0 ? 0 : state.answerValue - points;
}

export function addToScore() {
  state.currentPoints += state.answerValue;
  console.log(state.currentPoints, "<++ current POints");
  state.answerValue = SCORE_VALUES.ANSWER_VALUE;
}

//function to remove non-english movies
function filterEnglishMovies(data) {
  const results = data.filter((movie) => {
    return movie.original_language === "en";
  });

  state.allMovies.push(...results);
}
