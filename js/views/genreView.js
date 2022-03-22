import view from "./view.js";

class GenreView extends view {
  _parentEl = document.querySelector(".how-it-works-popup");
  _formEl = document.querySelector(".genre-form");
  _errorMessage =
    "Unable to load Genres. Please try again by refreshing the page";

  constructor() {
    super();
  }

  _formClear() {
    this._formEl.innerHTML = "";
  }

  renderData(data) {
    const markup = `
    <label for="Genres">Choose a Genre:</label>
    <select id="genre" name="genre">
    <option value="9000">Popular</option>
      ${data
        .map((element) => {
          const { id, name } = element;
          return `<option value="${id}">${name}</option>`;
        })
        .join("")}
    </select>
    <button class="btn how-it-works-btn btn-styled">Start!</button`;

    this._formClear();
    this._formEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", async (e) => {
      await handler();
    });
  }

  addHandlerSubmit(handler) {
    this._formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const select = document.getElementById("genre");
      const option = select.options[select.selectedIndex];
      await handler(option.value);
    });
  }
}

export default new GenreView();
