import * as model from "./model.js";
import instructionsView from "./views/instructionsView.js";
import moviePosterView from "./views/moviePosterView.js";
import titleView from "./views/titleView.js";
import scrambledTitleView from "./views/scrambledTitleView.js";
import submitAnswerView from "./views/submitAnswerView.js";
import tileView from "./views/tilesView.js";
import answerValueView from "./views/answerValueView.js";
import currentQuestionDataView from "./views/currentQuestionDataView.js";
import newGameModalPopup from "./views/newGameModalView.js";
import { SCORE_VALUES, TOTAL_PAGES } from "./config.js";
import newGameModalView from "./views/newGameModalView.js";
import movieTextDataView from "./views/MovieTextDataView.js";

// HELPER FUNCTIONS
async function getMovieHelpler() {}

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
  try {
    await model.getAllMovies();
  } catch (err) {
    throw err;
  }
}

function removePoints(points) {
  model.removePoints(points);
  answerValueView.renderData(model.state.answerValue);
}
function getMovie() {
  setAnswerValueHelper();
  currentQuestionDataView.renderQuestionNum(model.state.currentQuestion);
  model.returnRandomMovie();
  tileView.renderData();
  moviePosterView.renderData(model.state.currentMovie);
  titleView.renderData(model.state.currentMovie);
  scrambledTitleView.renderData(model.state.currentMovie);
  movieTextDataView._clear();
  movieTextDataView.renderButtons();
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

//main new movie call function
async function controlGetMovies() {
  moviePosterView.renderSpinner();
  await createModelState();
  getMovie();
  console.log(model.state);
}

function controlCheckAnswer() {
  const isCorrect = titleView.checkAnswer();
  if (isCorrect) {
    gameOver();
    setCurrentScoreHelper();
    tileView._clear();
    submitAnswerView.correctAnswer(model.state.gameOver);
    movieTextDataView.disableBtns();
  }
  if (!isCorrect) {
    submitAnswerView.wrongAnswer();
  }
}

function controlNextMovie() {
  getMovie();
}

function playAgain() {
  model.resetScores();
  currentQuestionDataView.renderTotalPoints(model.state.currentPoints);
  getMovie();
  submitAnswerView.reset();
}

function controlSetTiles(tile) {
  tileView.removeTile(tile);
  removePoints(SCORE_VALUES.TILE_DEDUCTIONS);
  console.log(model.state.answerValue);
}

function controlSynopsis() {
  movieTextDataView.renderDataSynopsis(model.state.currentMovie.overview);
  movieTextDataView.hideSynopsisBtn();
  removePoints(SCORE_VALUES.SYNOPSIS_DEDUCTIONS);
}

function init() {
  model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
  answerValueView.renderData(model.state.answerValue);
  instructionsView.addHandlerClick(controlGetMovies);
  submitAnswerView.addHandlerClickSubmit(controlCheckAnswer);
  submitAnswerView.addHandlerClickNext(controlNextMovie);
  newGameModalView.addHandlerClickPlayAgain(playAgain);
  tileView.addHandlerClick(controlSetTiles);
  movieTextDataView.addHandlerClickSynopsis(controlSynopsis);
}

init();
