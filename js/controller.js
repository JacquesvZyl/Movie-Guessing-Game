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
    console.log(model.state.currentMovie.cast);
  } catch (err) {
    console.error(err);
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

//main new movie call function
async function controlGetMovies() {
  moviePosterView.renderSpinner();
  await createModelState();
  await getMovie();
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
  console.log(model.state.answerValue);
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

function init() {
  model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
  answerValueView.renderData(model.state.answerValue);
  instructionsView.addHandlerClick(controlGetMovies);
  submitAnswerView.addHandlerClickSubmit(controlCheckAnswer);
  submitAnswerView.addHandlerClickNext(controlNextMovie);
  newGameModalView.addHandlerClickPlayAgain(playAgain);
  tileView.addHandlerClick(controlSetTiles);
  movieTextDataView.addHandlerClickSynopsis(controlSynopsis);
  movieTextDataView.addHandlerClickCast(controlCast);
  movieTextDataView.addHandlerClickRelease(controlRelease);
}

init();
