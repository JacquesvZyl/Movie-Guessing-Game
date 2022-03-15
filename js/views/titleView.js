import view from "./view.js";
import { FORMAT } from "../config.js";

class ScrambledTitleView extends view {
  _parentEl = document.querySelector("#dropZone-wrapper");
  _attachEl = document.querySelector("#letter-choice-wrapper");
  _errorMessage = "Unable to load Movie Title. Please try again";

  constructor() {
    super();
    this._letterMoveHandler();
  }

  _createTitleDiv(index, letter, className, isSpecialChar) {
    const newDiv = document.createElement("div");
    //prettier-ignore
    className.split(" ").forEach((classname) => newDiv.classList.add(classname));
    //prettier-ignore
    isSpecialChar ? (newDiv.innerText = letter) : (newDiv.dataset.letter = letter.toUpperCase());
    this._parentEl.appendChild(newDiv);
  }

  renderData(data) {
    this._clear();
    if (!data) return this.renderError();
    this._data = data;

    data.title.split("").forEach((letter, i) => {
      const bool = letter.match(FORMAT);
      //prettier-ignore
      const className = bool ? "special-char-placeholder" : "border-true title-placeholder";
      this._createTitleDiv(i, letter, className, bool);
    });
    //const markup = `<div class="special-char-placeholder border-true">${finalString}</div>`;
  }

  checkAnswer() {
    this._parentEl.querySelectorAll(".letter-choice").forEach((el) => {
      console.log(el.dataset.letter, "<==== child");
      console.log(el.parentElement.dataset.letter, "<==== parent");
    });

    const allFieldsPopulated = Array.from(
      document.querySelectorAll(".title-placeholder")
    ).every((div) => div.childElementCount > 0);
    if (!allFieldsPopulated) return allFieldsPopulated;
    return Array.from(this._parentEl.querySelectorAll(".letter-choice")).every(
      (div) => div.parentElement.dataset.letter === div.dataset.letter
    );
  }

  _moveLetter(e) {
    const letter = e.target.closest(".letter-choice");
    console.log(letter);
    if (!letter) return;
    console.log(letter);
    console.log(this._attachEl);
    this._attachEl.appendChild(letter);
    letter.classList.add("border-true");
    letter.classList.add("margin-between");
  }

  _letterMoveHandler() {
    this._parentEl.addEventListener("click", this._moveLetter.bind(this));
  }
}

export default new ScrambledTitleView();

/* 
function createTitleDiv(string, className) {
  for (i in string) {
    const newDiv = document.createElement("div");
    if (string[i].match(format)) {
      newDiv.innerText = string[i];
      newDiv.classList.add("special-char-placeholder");
    } else {
      newDiv.classList.add(className);
      //newDiv.style.backgroundColor = "red";
      newDiv.classList.add("border-true");
      newDiv.id = `placeholder-${i}`;
    }

    dropZone.appendChild(newDiv);
  }
}

*/
