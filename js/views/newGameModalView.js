import view from "./view.js";
import { API_DATA, FORMAT, SUBMIT_ERROR_TIMEOUT_SEC } from "../config.js";
import * as helpers from "../helpers.js";

class newGameModalPopup extends view {
  _parentEl = document.querySelector(".popup");
  _errorMessage = "   Incorrect   ";
  _totalPoints = this._parentEl.querySelector(".popup-total-points");
  _possiblePoints = this._parentEl.querySelector(".popup-possible-points");
  _playAgainBtn = this._parentEl.querySelector(".play-again-btn");
  _quitBtn = this._parentEl.querySelector(".close");

  constructor() {
    super();
    this._addHandlerClickQuit();
  }

  renderData(totalScore, totalPossiblePoints) {
    this._totalPoints.innerText = totalScore;
    this._possiblePoints.innerText = totalPossiblePoints;
  }

  // createLettersDiv(movie.original_title, letterChoiceWrapper, "letter-choice");

  _addHandlerClickQuit() {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".close");
      if (!btn) return;
      this.toggleWindow();
    });
  }

  addHandlerClickPlayAgain(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".play-again-btn");
      if (!btn) return;
      this.toggleWindow();
      handler();
    });
  }
  addHandlerClickChangeGenre(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-change-genre");
      if (!btn) return;
      this.toggleWindow();
      handler();
    });
  }
}

export default new newGameModalPopup();

/* 
document.querySelector(".popup .close").addEventListener("click", () => {
  document.querySelector(".popup").hidden = true;
});

function callPopUp() {
  const popup = document.querySelector(".popup");
  popup.hidden = false;
  popup.querySelector("span:nth-child(1)").innerText = totalPoints.innerText;
  popup.querySelector("span:nth-child(2)").innerText = 100 * totalQuestions;
}

document.querySelector(".play-again-btn").addEventListener("click", () => {
  currentMovieQuestion = 0;
  totalPoints.innerText = 0;
  document.querySelector(".popup").hidden = true;
  reset();
  fetchMovie();
});


        <div class="popup hidden">
            <div class="popup-text">
                <i class="fas fa-check-circle"></i>
                <p>Great!!</p>
                <p>You scored <span class="popup-total-points">0</span> out of <span
                        class="popup-possible-points">0</span></p>
                <button class="btn btn-success play-again-btn">Play again</button>
                <button class="close btn btn-success">Nah!</button>
            </div>
        </div>
*/
