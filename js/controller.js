import * as model from "./model.js";
import instructionsView from "./views/instructionsView.js";
import moviePosterView from "./views/moviePosterView.js";
import titleView from "./views/titleView.js";
import scrambledTitleView from "./views/scrambledTitleView.js";
import submitAnswerView from "./views/submitAnswerView.js";
import tileView from "./views/tilesView.js";
import answerValueView from "./views/answerValueView.js";
import currentQuestionDataView from "./views/currentQuestionDataView.js";
import { SCORE_VALUES } from "./config.js";

async function controlGetMovies() {
  try {
    model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
    model.setQuestionNum();
    currentQuestionDataView.renderQuestionNum(model.state.currentQuestion);
    moviePosterView.renderSpinner();
    await model.fetchMovie();
    tileView.renderData();
    moviePosterView.renderData(model.state.currentMovie);
    titleView.renderData(model.state.currentMovie);
    scrambledTitleView.renderData(model.state.currentMovie);
  } catch (err) {
    console.error(err);
  }
}

function controlCheckAnswer() {
  const isCorrect = titleView.checkAnswer();
  if (isCorrect) {
    model.addToScore();
    tileView._clear();
    currentQuestionDataView.renderTotalPoints(model.state.currentPoints);
  }
  if (!isCorrect) {
    submitAnswerView.wrongAnswer();
  }
}

function controlSetTiles(tile) {
  tile.classList.add("clicked-tile");
  model.removePoints(SCORE_VALUES.TILE_DEDUCTIONS);
  answerValueView.renderData(model.state.answerValue);
  console.log(model.state.answerValue);
}

function init() {
  model.state.answerValue = SCORE_VALUES.ANSWER_VALUE;
  answerValueView.renderData(model.state.answerValue);
  instructionsView.addHandlerClick(controlGetMovies);
  submitAnswerView.addHandlerClick(controlCheckAnswer);
  tileView.addHandlerClick(controlSetTiles);
}

init();
