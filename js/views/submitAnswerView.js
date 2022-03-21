import view from "./view.js";
import { API_DATA, FORMAT, SUBMIT_ERROR_TIMEOUT_SEC } from "../config.js";
import * as helpers from "../helpers.js";

class SubmitAnswerView extends view {
  _parentEl = document.querySelector(".button-container");
  _errorMessage = "   Incorrect   ";
  _submitBtn = this._parentEl.querySelector(".submit-btn");
  _skipBtn = this._parentEl.querySelector(".skip-btn");
  _nextBtn = this._parentEl.querySelector(".next-btn");

  constructor() {
    super();
  }

  // createLettersDiv(movie.original_title, letterChoiceWrapper, "letter-choice");

  reset() {
    this._submitBtn.disabled = false;
    this._skipBtn.disabled = false;
    this._nextBtn.classList.add("hidden");
    console.log("RESET COMPLETE");
  }

  // bool checks whether game is over or not
  correctAnswer(bool) {
    this._submitBtn.disabled = true;
    this._skipBtn.disabled = true;
    bool
      ? this._nextBtn.classList.add("hidden")
      : this._nextBtn.classList.remove("hidden");
  }

  wrongAnswer() {
    this._submitBtn.innerText = this._errorMessage;
    this._submitBtn.classList.add("btn-incorrect");

    setTimeout(() => {
      this._submitBtn.innerText = "Submit Answer";
      this._submitBtn.classList.remove("btn-incorrect");
    }, SUBMIT_ERROR_TIMEOUT_SEC * 1000);
  }

  addHandlerClickSubmit(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".submit-btn");
      if (!btn) return;
      handler();
    });
  }
  addHandlerClickNext(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".next-btn");
      if (!btn) return;
      this.reset();
      handler();
    });
  }
  addHandlerClickSkip(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".skip-btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new SubmitAnswerView();
