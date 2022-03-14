export default class View {
  _data;

  toggleWindow() {
    this._parentEl.classList.toggle("hidden");
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="../../images/img/icons.svg#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
