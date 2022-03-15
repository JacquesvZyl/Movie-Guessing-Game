import view from "./view.js";
import { API_DATA, FORMAT, SUBMIT_ERROR_TIMEOUT_SEC } from "../config.js";
import * as helpers from "../helpers.js";

class SubmitAnswerView extends view {
  _parentEl = document.querySelector("#submit-btn");
  _errorMessage = "   Incorrect   ";

  constructor() {
    super();
  }

  // createLettersDiv(movie.original_title, letterChoiceWrapper, "letter-choice");

  wrongAnswer() {
    this._parentEl.innerText = this._errorMessage;
    this._parentEl.classList.add("btn-incorrect");

    setTimeout(() => {
      this._parentEl.innerText = "Submit Answer";
      this._parentEl.classList.remove("btn-incorrect");
    }, SUBMIT_ERROR_TIMEOUT_SEC * 1000);
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", handler);
    handler();
  }
}

export default new SubmitAnswerView();
