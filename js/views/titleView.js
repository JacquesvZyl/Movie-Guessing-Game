import view from "./view.js";
import { FORMAT } from "../config.js";

class ScrambledTitleView extends view {
  _parentEl = document.querySelector("#dropZone-wrapper");
  _errorMessage = "Unable to load Movie Title. Please try again";

  constructor() {
    super();
  }

  _createTitleDiv(index, letter, className, isSpecialChar) {
    const newDiv = document.createElement("div");
    //prettier-ignore
    className.split(" ").forEach((classname) => newDiv.classList.add(classname));
    //prettier-ignore
    isSpecialChar ? (newDiv.innerText = letter) : (newDiv.dataset.letter = `${index}`);
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

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler();
    });
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
