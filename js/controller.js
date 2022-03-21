import * as model from "./model.js";
//import instructionsView from "./views/instructionsView.js";
import moviePosterView from "./views/moviePosterView.js";
import titleView from "./views/titleView.js";
import scrambledTitleView from "./views/scrambledTitleView.js";
import submitAnswerView from "./views/submitAnswerView.js";
import tileView from "./views/tilesView.js";
import answerValueView from "./views/answerValueView.js";
import currentQuestionDataView from "./views/currentQuestionDataView.js";
import newGameModalPopup from "./views/newGameModalView.js";
import { SCORE_VALUES, API_DATA } from "./config.js";
import newGameModalView from "./views/newGameModalView.js";
import movieTextDataView from "./views/MovieTextDataView.js";
import genreView from "./views/genreView.js";

// HELPER FUNCTIONS

// only run when fetching movie
function setAnswerValueHelper() {
  model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
  answerValueView.renderData(model.state.answerValue);
  model.setQuestionNum();
}

// only run after correct movie
function setCurrentScoreHelper() {
  model.addToScore();
  currentQuestionDataView.renderTotalPoints(model.state.currentPoints);
  newGameModalPopup.renderData(
    model.state.currentPoints,
    model.state.pointsOutOf
  );
}

//do one big API call and save data to model.state
async function createModelState() {
  // url DISCOVER_MOVIE api_key=API_DATA&with_genres=genre
  try {
    const url =
      model.state.selectedGenre != 9000
        ? `${API_DATA.URL}${API_DATA.DISCOVER_MOVIE}api_key=${API_DATA.API_KEY}&with_genres=${model.state.selectedGenre}`
        : `${API_DATA.URL}${API_DATA.POPULAR}&api_key=${API_DATA.API_KEY}&${API_DATA.LANGUAGE}`;
    await model.getAllMovies(url);
  } catch (err) {
    throw err;
  }
}

function renderAllData() {
  currentQuestionDataView.renderQuestionNum(model.state.currentQuestion);
  tileView.renderData();
  moviePosterView.renderData(model.state.currentMovie);
  titleView.renderData(model.state.currentMovie);
  scrambledTitleView.renderData(model.state.currentMovie);
  movieTextDataView.renderData(model.state.currentMovie);
  movieTextDataView.renderButtonData();
  submitAnswerView.reset();
  movieTextDataView.enableBtns();
}

function removePoints(points) {
  model.removePoints(points);
  answerValueView.renderData(model.state.answerValue);
}

async function getMovie() {
  try {
    setAnswerValueHelper();
    movieTextDataView.reset();
    await model.returnRandomMovie();
    renderAllData();
  } catch (err) {
    moviePosterView.renderError();
  }
}

function gameOver() {
  //check is game is over and set bool in state
  //prettier-ignore
  model.state.gameOver = model.state.currentQuestion >= SCORE_VALUES.TOTAL_QUESTIONS;
  if (model.state.gameOver) {
    newGameModalPopup.toggleWindow();
    submitAnswerView.disable;
  }

  //;
}

// MAIN CONTROLLER FUNCTIONS

function controlCheckAnswer() {
  const isCorrect = titleView.checkAnswer();
  if (isCorrect) {
    gameOver();
    setCurrentScoreHelper();
    tileView.clear();
    submitAnswerView.correctAnswer(model.state.gameOver);
    movieTextDataView.disableBtns();
  }
  if (!isCorrect) {
    submitAnswerView.wrongAnswer();
  }
}

async function controlNextMovie() {
  await getMovie();
}

function playAgain() {
  model.resetScores();
  currentQuestionDataView.renderTotalPoints(model.state.currentPoints);
  getMovie();
}

function controlSetTiles(tile) {
  tileView.removeTile(tile);
  removePoints(SCORE_VALUES.TILE_DEDUCTIONS);
}

function controlSynopsis() {
  movieTextDataView.hideSynopsisBtn();
  removePoints(SCORE_VALUES.SYNOPSIS_DEDUCTIONS);
}

function controlRelease() {
  movieTextDataView.hideReleaseBtn();
  removePoints(SCORE_VALUES.RELEASEDATE_DEDUCTIONS);
}

function controlCast() {
  movieTextDataView.hideCastBtn();
  removePoints(SCORE_VALUES.CAST_DEDUCTIONS);
}

async function controlGetGenreTypes() {
  try {
    model.resetScores();
    genreView.toggleWindow();
    if (!model.state.genres[0]) await model.getGenres();
    titleView.clear();
    genreView.renderData(model.state.genres);
  } catch (err) {
    genreView.renderError();
  }
}

//main controller function that fetches all movies based on genre
async function controlGetGenreMovies(genreId) {
  try {
    model.state.selectedGenre = Number(genreId);
    moviePosterView.renderSpinner();
    genreView.toggleWindow();
    await createModelState();
    await getMovie();
  } catch (err) {
    moviePosterView.renderError();
  }
}

function controlSkipMovie() {
  titleView.renderCorrectTitle();
  removePoints(100);
  gameOver();
  setCurrentScoreHelper();
  tileView.clear();
  scrambledTitleView.clear();
  submitAnswerView.correctAnswer(model.state.gameOver);
  movieTextDataView.disableBtns();
}

function init() {
  model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
  answerValueView.renderData(model.state.answerValue);
  //instructionsView.addHandlerClick(controlGetMovies);
  submitAnswerView.addHandlerClickSubmit(controlCheckAnswer);
  submitAnswerView.addHandlerClickNext(controlNextMovie);
  submitAnswerView.addHandlerClickSkip(controlSkipMovie);
  newGameModalView.addHandlerClickPlayAgain(playAgain);
  newGameModalView.addHandlerClickChangeGenre(controlGetGenreTypes);
  tileView.addHandlerClick(controlSetTiles);
  movieTextDataView.addHandlerClickSynopsis(controlSynopsis);
  movieTextDataView.addHandlerClickCast(controlCast);
  movieTextDataView.addHandlerClickRelease(controlRelease);
  genreView.addHandlerLoad(controlGetGenreTypes);
  genreView.addHandlerSubmit(controlGetGenreMovies);
}

init();
