import view from "./view.js";

class answerValueView extends view {
  _parentEl = document.querySelector(".points-value-container");

  renderData(points) {
    this._parentEl.querySelector("#answer-value").innerText = points;
  }
}

export default new answerValueView();
