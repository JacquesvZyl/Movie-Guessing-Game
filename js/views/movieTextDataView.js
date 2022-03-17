import view from "./view.js";
import { SCORE_VALUES } from "../config.js";
//import * as helpers from "../helpers.js";

class MovieTextDataView extends view {
  _parentEl = document.querySelector(".text-container");
  _parentCast = document.querySelector(".cast-container");
  _parentCastText = document.querySelector(".cast-text");
  _parentSynopsis = document.querySelector(".synopsis-container");
  _parentSynopsisText = document.querySelector(".synopsis-text");
  _parentRelease = document.querySelector(".date-container");
  _parentReleaseText = document.querySelector(".date-text");

  constructor() {
    super();
  }

  reset() {
    const textEllArray = [
      this._parentSynopsisText,
      this._parentReleaseText,
      this._parentCastText,
    ];
    textEllArray.forEach((el) => {
      el.classList.add("hidden");
      el.innerHTML = "";
    });
    this._parentEl
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.remove("hidden"));
  }

  hideSynopsisBtn() {
    this._parentEl.querySelector(".show-synopsis-btn").classList.add("hidden");
    this._parentSynopsisText.classList.remove("hidden");
  }
  hideReleaseBtn() {
    this._parentEl
      .querySelector(".show-release-date-btn")
      .classList.add("hidden");
    this._parentReleaseText.classList.remove("hidden");
  }

  hideCastBtn() {
    this._parentEl.querySelector(".show-cast-btn").classList.add("hidden");
    this._parentCastText.classList.remove("hidden");
  }

  disableBtns() {
    this._parentEl
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = true));
  }
  enableBtns() {
    this._parentEl
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = false));
  }

  renderButtonData() {
    this._parentEl.querySelector(
      ".show-synopsis-btn"
    ).innerText = `Show Synopsis (-${SCORE_VALUES.SYNOPSIS_DEDUCTIONS}pts)`;
    this._parentEl.querySelector(
      ".show-cast-btn"
    ).innerText = `Show Cast (-${SCORE_VALUES.CAST_DEDUCTIONS}pts)`;
    this._parentEl.querySelector(
      ".show-release-date-btn"
    ).innerText = `Show Release Date (-${SCORE_VALUES.RELEASEDATE_DEDUCTIONS}pts`;
  }

  renderData(data) {
    const { overview, cast, release_date } = data;

    const top3Cast = cast.slice(0, 3).map((element) => element.name);

    const synopsisMarkup = `
      <h5>SYNOPSIS:</h5>
      <p>${overview}</p>
      `;

    const releaseDateMarkup = `
      <h5>RELEASE DATE:</h5>
      <p>${release_date}</p>
      `;
    const castMarkup = `
      <h5>CAST:</h5>
      <ul>
      ${top3Cast.map((element) => `<li>${element}</li>`).join("")}
      </ul>
      `;

    this._parentSynopsisText.insertAdjacentHTML("beforeend", synopsisMarkup);
    this._parentReleaseText.insertAdjacentHTML("beforeend", releaseDateMarkup);
    this._parentCastText.insertAdjacentHTML("beforeend", castMarkup);
  }

  addHandlerClickSynopsis(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".show-synopsis-btn");
      if (!btn) return;
      handler();
    });
  }

  addHandlerClickCast(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".show-cast-btn");
      if (!btn) return;
      handler();
    });
  }
  addHandlerClickRelease(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".show-release-date-btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new MovieTextDataView();

/* 
            <div class="text-container">



                <div class="cast-container">
                    <button class="btn-styled show-cast-btn hidden">Show Cast (-20pts)</button>
                    <div class="cast-text">

                    </div>
                </div>

                <div class="synopsis-container">
                    <button class="btn-styled show-synopsis-btn hidden">Show Synopsis (-15pts)</button>
                    <div class="synopsis-text">

                    </div>
                </div>
                <div class="date-container">
                </div>
                <div class="release-date-container">
                    <button class="btn-styled show-release-date-btn hidden">Show Release Date (-5pts)</button>

                    <div class="release-date-text">

                    </div>
                </div>
                <div class="cast-container">
                </div>
            </div>
*/
