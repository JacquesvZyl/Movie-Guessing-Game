import view from "./view.js";
import { API_DATA, FORMAT } from "../config.js";
import * as helpers from "../helpers.js";

class ScrambledTitleView extends view {
  _parentEl = document.querySelector("#letter-choice-wrapper");
  _attachEl = document.querySelector("#dropZone-wrapper");
  _errorMessage = "Unable to load data. Please try again";

  constructor() {
    super();
    this._letterMoveHandler();
  }

  // createLettersDiv(movie.original_title, letterChoiceWrapper, "letter-choice");

  _createLettersDiv(data) {
    data.forEach((letter) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("letter-choice", "border-true", "margin-between");
      newDiv.dataset.letter = letter[0].toUpperCase();
      newDiv.innerText = letter[0].toUpperCase();
      this._parentEl.appendChild(newDiv);
    });
  }

  // saves array of letter and current index so that we can populate data attr with index later
  _getDataAttribute(data) {
    const dataAttr = data
      .split("")
      .map((letter, i) => [letter, i])
      .filter((letter) => !letter[0].match(FORMAT));
    return dataAttr;
  }

  renderData(data) {
    this.clear();
    if (!data) return this.renderError();
    this._data = data;
    const dataAttrArray = this._getDataAttribute(this._data.title);
    const shuffledTitle = helpers.shuffle(dataAttrArray);
    this._createLettersDiv(shuffledTitle);
    //const markup = `<div class="special-char-placeholder border-true">${finalString}</div>`;
  }

  _moveletter(e) {
    const letter = e.target.closest(".letter-choice");
    if (!letter) return;
    const titlePlaceholders = document.querySelectorAll(".title-placeholder");
    for (const placeholder of titlePlaceholders) {
      if (placeholder.childElementCount <= 0) {
        placeholder.appendChild(letter);
        letter.classList.remove("border-true");
        letter.classList.remove("margin-between");
        break;
      }
    }
  }

  _letterMoveHandler() {
    this._parentEl.addEventListener("click", this._moveletter.bind(this));
  }
}

export default new ScrambledTitleView();

/* 
function moveLetters(event) {
  const titlePlaceHolders = document.querySelectorAll(".title-placeholder");
  if (event.target.parentNode.id === "letter-choice-wrapper") {
    for (i of titlePlaceHolders) {
      if (i.childElementCount <= 0) {
        i.appendChild(event.target);
        event.target.classList.remove("border-true");
        event.target.classList.remove("margin-between");
        break;
      }
    }
  } else {
    letterChoiceWrapper.append(event.target);
    event.target.classList.add("border-true");
    event.target.classList.add("margin-between");
  }
}
*/
