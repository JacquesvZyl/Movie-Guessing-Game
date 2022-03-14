import view from "./view.js";
import { API_DATA } from "../config.js";

class ScrambledTitleView extends view {
  _parentEl = document.querySelector(".letter-choice-wrapper");
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
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new ScrambledTitleView();
