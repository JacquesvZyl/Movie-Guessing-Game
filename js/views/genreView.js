import view from "./view.js";

class GenreView extends view {
  _parentEl = document.querySelector(".how-it-works-popup");
  _formEl = document.querySelector(".genre-form");
  _errorMessage = "Unable to load Genres. Please try again";

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
      console.log("running load genre");
      await handler();
    });
  }

  addHandlerSubmit(handler) {
    this._formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const select = document.getElementById("genre");
      console.log(select.options);
      const option = select.options[select.selectedIndex];
      await handler(option.value);
    });
  }
}

export default new GenreView();

/* 

        <div class="how-it-works-popup">
            <div class="how-it-works-popup-text-wrapper">
                

            <h4>HOW IT WORKS:</h4>
            <p>Try to guess the movie by reading the movie synopsis. Each movie is worth 100 points.</p>
            <p>Stuck? Click on the black question mark boxes to reveal a piece of the movie poster.</p>
            <p>Revealing a part of the Movie poster will cost you 15 points</p>
            <p>Alternatively, show the Movie Synopsis, cast or release date by clicking the buttons on the right of
            the movie poster</p>
            <button class="btn how-it-works-btn btn-styled">Got it!</button>
            </div>
            
        </div>

*/
