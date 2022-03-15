import view from "./view.js";

class currentQuestionDataView extends view {
  _parentEl = document.querySelector(".current-question-data");

  renderTotalPoints(points) {
    this._parentEl.querySelector(".total-points span").innerText = points;
  }
  renderQuestionNum(num) {
    this._parentEl.querySelector(".current-question span").innerText = num;
  }
}

export default new currentQuestionDataView();

/* 
        <div class="current-question-data">
            <p class="current-question"><span>0</span> of <span>10</span></p>
            <h3 class="total-points">Total points: <span>0</span></h3>
        </div>

*/
