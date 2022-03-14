import * as model from "./model.js";
import instructionsView from "./views/instructionsView.js";
import moviePosterView from "./views/moviePosterView.js";
import titleView from "./views/titleView.js";

async function controlGetMovies() {
  moviePosterView.renderSpinner();
  await model.fetchMovie();
  console.log(model.state);
  moviePosterView.renderData(model.state.currentMovie);
  titleView.renderData(model.state.currentMovie);
}

function init() {
  instructionsView.addHandlerClick(controlGetMovies);
}

init();
