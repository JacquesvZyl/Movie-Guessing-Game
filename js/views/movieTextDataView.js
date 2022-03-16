import view from "./view.js";
import { SCORE_VALUES } from "../config.js";
//import * as helpers from "../helpers.js";

class MovieTextDataView extends view {
  _parentEl = document.querySelector(".text-container");

  constructor() {
    super();
  }

  hideSynopsisBtn() {
    this._parentEl.querySelector(".show-synopsis-btn").classList.add("hidden");
  }

  disableBtns() {
    this._parentEl.querySelector(".show-synopsis-btn").disabled = true;
  }
  enableBtns() {
    this._parentEl.querySelector(".show-synopsis-btn").disabled = false;
  }

  renderButtons() {
    const markup = `
      <button class="btn-styled show-synopsis-btn">Show Synopsis (-15pts)</button>
      `;
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  renderDataSynopsis(synopsis) {
    const markup = `
    
      <div class="synopsis-container">
      <h5>Synopsis:</h5>
      <p>${synopsis}</p>
  </div>
      `;
    this._parentEl.insertAdjacentHTML("beforeEnd", markup);
  }

  addHandlerClickSynopsis(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".show-synopsis-btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new MovieTextDataView();
