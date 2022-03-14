import view from "./view.js";

class InstructionsView extends view {
  _parentEl = document.querySelector(".how-it-works-popup");
  _btnClose = document.querySelector(".how-it-works-btn");

  constructor() {
    super();
    this._addHandlerHideWindow();
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new InstructionsView();
