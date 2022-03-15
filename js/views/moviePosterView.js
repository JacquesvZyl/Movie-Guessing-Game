import view from "./view.js";
import { API_DATA } from "../config.js";

class MoviePosterView extends view {
  _parentEl = document.querySelector(".poster-container");
  _errorMessage = "Unable to load Movie Poster. Please try again";

  constructor() {
    super();
  }

  renderData(data) {
    if (!data) return this.renderError();
    this._data = data;
    const markup = `
    <img class="poster" src="${API_DATA.IMG_BASE}${data.poster_path}" alt="">
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
    console.dir(this._parentEl);
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new MoviePosterView();

/* 
function setTiles() {
  let posterSquare =
    parseInt(posterContainer.offsetWidth) *
    parseInt(posterContainer.offsetHeight);
  let tileSquare =
    parseInt(createTile().offsetWidth) * parseInt(createTile().offsetHeight);
  let totalTiles = posterSquare / tileSquare;

  for (let i = 0; i < 25; i++) {
    tileContainer.appendChild(createTile());
  }
}

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.offsetWidth = 60 + "px";
  tile.offsetHeight = 90 + "px";
  tile.innerText = "?";
  return tile;
}

*/
