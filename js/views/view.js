export default class View {
  _data;

  toggleWindow() {
    this._parentEl.classList.toggle("hidden");
  }

  clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="../../images/img/icons.svg#icon-loader"></use>
              </svg>
            </div>`;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <svg>
      <use href="../../images/img/icons.svg#icon-alert-triangle"></use>
    </svg>
              <p>${message}</p>
            </div>
      `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
