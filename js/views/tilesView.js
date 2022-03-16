import view from "./view.js";
import { API_DATA, NUM_TILES_IN_ROW, TILES_SYMBOL } from "../config.js";
import * as helpers from "../helpers.js";

class TilesView extends view {
  _parentEl = document.querySelector(".tiles-container");
  _posterEl = document.querySelector(".poster-container");

  constructor() {
    super();
  }

  _createTile(width, height) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.width = `${width}px`;
    tile.style.height = `${height}px`;
    tile.innerText = TILES_SYMBOL;
    return tile;
  }

  removeTile(tile) {
    tile.classList.add("clicked-tile");
  }

  _removeRandomTile() {
    const tileAmt = NUM_TILES_IN_ROW * NUM_TILES_IN_ROW - 1;
    const randomTileIndex = helpers.random(0, tileAmt);
    document.querySelectorAll(".tile").forEach((tile, index) => {
      index === randomTileIndex ? this.removeTile(tile) : "";
    });
  }

  renderData() {
    const width = Number(this._posterEl.offsetWidth);
    const height = Number(this._posterEl.offsetHeight);
    console.dir(this._posterEl);
    const tileWidth = (width / NUM_TILES_IN_ROW).toFixed(0);
    const tileHeight = (height / NUM_TILES_IN_ROW).toFixed(0);
    for (let i = 0; i < NUM_TILES_IN_ROW * NUM_TILES_IN_ROW; i++) {
      this._parentEl.appendChild(this._createTile(tileWidth, tileHeight));
    }
    this._removeRandomTile();
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".tile");
      if (!btn) return;
      handler(btn);
    });
  }
}

export default new TilesView();
