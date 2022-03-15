import view from "./view.js";
import { API_DATA, NUM_TILES_IN_ROW, TILES_SYMBOL } from "../config.js";

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

  renderData() {
    const width = Number(this._posterEl.offsetWidth);
    const height = Number(this._posterEl.offsetHeight);
    console.dir(this._posterEl);
    const tileWidth = (width / NUM_TILES_IN_ROW).toFixed(0);
    const tileHeight = (height / NUM_TILES_IN_ROW).toFixed(0);
    for (let i = 0; i < NUM_TILES_IN_ROW * NUM_TILES_IN_ROW; i++) {
      this._parentEl.appendChild(this._createTile(tileWidth, tileHeight));
    }
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

/* 
function setTiles() {
  let posterSquare =
    parseInt(posterContainer.offsetWidth) *
    parseInt(posterContainer.offsetHeight);
  let tileSquare =
    parseInt(createTile().offsetWidth) * parseInt(createTile().offsetHeight);
  let totalTiles = posterSquare / tileSquare;

  for (let i = 0; i < 25; i++) {
    tileContainer.appendChild(createTile());
  }
}

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.offsetWidth = 60 + "px";
  tile.offsetHeight = 90 + "px";
  tile.innerText = "?";
  return tile;
}

*/
