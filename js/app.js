const posterContainer = document.querySelector(".poster-container");
const tileContainer = document.querySelector(".tiles-container");
const poster = document.createElement("img");
const textContainer = document.querySelector(".text-container");
const btnContainer = document.querySelector(".button-container");
let uncoverBtn = document.querySelector(".uncover-next-btn");
const answerValue = document.querySelector("#answer-value");
const answer = document.querySelector("#answer");
const answerForm = document.querySelector("#answer-form");
const submitBtn = document.querySelector("#submit-btn");
const totalPoints = document.querySelector(".total-points span");
let currentMovieQuestion = 0;
let chosenMovie;
let underscoredTitle;

function newMovieArr() {
  //concatenate URL
  const concatenatedUrl =
    apiGETData.topRatedMovieArray +
    apiGETData.baseAPIKey +
    apiGETData.page +
    random(1, 3) +
    apiGETData.releaseYear +
    random(1980, 2021);
  return concatenatedUrl;
}

const fetchMovie = async () => {
  try {
    // Get array of movies from API
    const res = await axios.get(newMovieArr());
    // Pass results through to Sifting function
    MovieSift(res.data.results);
    tileseventListener();
  } catch (er) {
    alert(er);
  }
};

function MovieSift(array) {
  // new Array of english Movies
  const englishMovieArray = [];
  // Remove non-english movies and push to new Array
  for (a in array) {
    if (array[a].original_language === "en") {
      englishMovieArray.push(array[a]);
    }
  }
  //choose random movie out of English Movies array
  chosenMovie = englishMovieArray[random(0, englishMovieArray.length - 1)];
  setDomData(chosenMovie);
  questionNumber();
}

function setDomData(movie) {
  poster.classList.add("poster");
  poster.src = apiGETData.imgBase + movie.poster_path;
  posterContainer.style.backgroundImage = `url(${
    apiGETData.imgBase + movie.poster_path
  })`;

  //add Title data
  createTitleDiv(movie.original_title, "title-placeholder");
  createLettersDiv(movie.original_title, letterChoiceWrapper, "letter-choice");

  //add Synopsis data
  const overView = document.createElement("h3");
  overView.innerText = movie.overview;
  overView.classList.add("overview");
  textContainer.appendChild(overView);

  setTiles();
  setClearBtn();
  createClearBtnListener();
}

function questionNumber() {
  currentMovieQuestion++;
  document.querySelector(".current-question span:nth-child(1)").innerText =
    currentMovieQuestion;
}

function setNextQuestionBtn() {
  if (document.querySelector("#clear-btn")) {
    document.querySelector("#clear-btn").remove();
  }
  uncoverBtn = document.createElement("button");
  //uncoverBtn.classList.add("btn", "btn-success");
  uncoverBtn.id = "next-question-btn";
  uncoverBtn.innerText = "Next Movie >>";
  btnContainer.appendChild(uncoverBtn);
}

function setClearBtn() {
  if (document.querySelector("#next-question-btn")) {
    document.querySelector("#next-question-btn").remove();
  }
  uncoverBtn = document.createElement("button");
  uncoverBtn.id = "clear-btn";
  //uncoverBtn.classList.add("btn", "btn-warning");
  uncoverBtn.innerText = "Clear";
  btnContainer.appendChild(uncoverBtn);
}

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

function tileseventListener() {
  document.querySelectorAll(".tile").forEach((tile) =>
    tile.addEventListener("click", (event) => {
      event.target.innerText = "";
      event.target.classList.remove("tile");
      event.target.classList.add("clicked-tile");
      event.target.style.zIndex = "-100";
      removePoints(10);
    })
  );
}

function replaceAtIndex(_string, _index, _newValue) {
  split_string =
    _string.substring(0, _index) + " " + _string.substring(_index + 1);
  return_string = split_string.split("");
  return_string[_index] = _newValue;
  return_string = return_string.join("");
  return return_string;
}

function createNextMovieListener() {
  if (currentMovieQuestion < totalQuestions) {
    let nextMovieBtn = document.querySelector("#next-question-btn");
    if (nextMovieBtn) {
      nextMovieBtn.addEventListener("click", () => {
        reset();
        fetchMovie();
      });
    } else {
      console.error("nextMovieBtn node does not exist");
    }
  } else {
    document.querySelector("#next-question-btn").disabled = true;
    setTimeout(() => {
      callPopUp();
    }, 800);
  }
}

function removePoints(points) {
  if (parseInt(answerValue.innerText) - points < 0) {
    answerValue.innerText = "0";
  } else {
    answerValue.innerText = parseInt(answerValue.innerText) - points;
  }
}

function checkAnswer(movie) {
  movieTitleStripped = "";
  /* movie.original_title
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase()
    .split(" ")
    .join("");
 */
  for (i in movie.original_title) {
    if (!movie.original_title[i].match(format)) {
      movieTitleStripped += movie.original_title[i].toLowerCase();
    }
  }

  if (movieTitleStripped === fetchAnswer()) {
    removeAllTiles();
    totalPoints.innerText =
      parseInt(totalPoints.innerText) + parseInt(answerValue.innerText);
    const overview = document.querySelector(".overview");
    overview.innerText = "Correct!";
    overview.classList.remove("overview");
    overview.classList.add("correct-answer-text");
    //uncoverBtn.disabled = true;
    submitBtn.disabled = true;
    setNextQuestionBtn();

    createNextMovieListener();
  } else {
    wrongAnswerAnimation();
  }
}

function wrongAnswerAnimation() {
  submitBtn.innerText = "    Incorrect!    ";
  submitBtn.classList.add("btn-incorrect");
  //submitBtn.classList.add("btn", "btn-danger");

  setTimeout(() => {
    submitBtn.innerText = "Submit Answer";
    submitBtn.classList.remove("btn-incorrect");
  }, 800);
}

function removeAllTiles() {
  Array.from(document.querySelectorAll(".tile")).forEach((tile) =>
    tile.remove()
  );
  Array.from(document.querySelectorAll(".clicked-tile")).forEach((tile) =>
    tile.remove()
  );
}

function clearAnswer() {
  const parents = document.querySelectorAll(".title-placeholder");
  for (p of parents) {
    if (p.childElementCount > 0) {
      const letter = document.querySelector(`#${p.id} .letter-choice`);
      letter.classList.add("border-true");
      letter.classList.add("margin-between");
      letterChoiceWrapper.appendChild(letter);
    }
  }
}

function createClearBtnListener() {
  let uncover = document.querySelector("#clear-btn");
  if (uncover) {
    uncover.addEventListener("click", () => {
      clearAnswer();
    });
  } else {
  }
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  checkAnswer(chosenMovie);
});

//Reset and delete elements before returning next movie
function reset() {
  const title = document.querySelector(".title");
  const overview = document.querySelector(".overview");
  const correctAnswText = document.querySelector(".correct-answer-text");
  const titlePlaceHolders = document.querySelectorAll(".title-placeholder");
  const specialCharPlaceholders = document.querySelectorAll(
    ".special-char-placeholder"
  );
  const letterChoice = document.querySelectorAll(".letter-choice");
  if (title) {
    title.remove();
  }
  if (overview) {
    overview.remove();
  }
  if (correctAnswText) {
    correctAnswText.remove();
  }
  Array.from(titlePlaceHolders).forEach((element) => {
    element.remove();
  });
  Array.from(specialCharPlaceholders).forEach((element) => {
    element.remove();
  });
  Array.from(letterChoice).forEach((element) => {
    element.remove();
  });

  submitBtn.disabled = false;
  answerValue.innerText = 100;
}

document.querySelector(".popup .close").addEventListener("click", () => {
  document.querySelector(".popup").hidden = true;
});

function callPopUp() {
  const popup = document.querySelector(".popup");
  popup.hidden = false;
  popup.querySelector("span:nth-child(1)").innerText = totalPoints.innerText;
  popup.querySelector("span:nth-child(2)").innerText = 100 * totalQuestions;
}

document.querySelector(".play-again-btn").addEventListener("click", () => {
  currentMovieQuestion = 0;
  totalPoints.innerText = 0;
  document.querySelector(".popup").hidden = true;
  reset();
  fetchMovie();
});

document
  .querySelector(".how-it-works-popup button")
  .addEventListener("click", () => {
    document.querySelector(".how-it-works-popup").hidden = true;
    fetchMovie();
  });
document.querySelector(".popup").hidden = true;
document.querySelector(".current-question span:nth-child(2)").innerText =
  totalQuestions;

/* ------------------------------------------------------------DRAG AND DROP CODE------------------------------------------------------------ */
const letterChoiceWrapper = document.querySelector("#letter-choice-wrapper");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const dropZone = document.querySelector("#dropZone-wrapper");

const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
function shuffleMovieTitle(string) {
  const titleArray = Array.from(string);
  for (let i = 0; i < 2; i++) {
    titleArray.push(alphabet[random(0, alphabet.length - 1)]);
  }
  return shuffle(titleArray);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  //return array;
  return array;
}

function createLettersDiv(string, element, className) {
  const shuffledMovieName = shuffleMovieTitle(string);
  for (j in shuffledMovieName) {
    if (!shuffledMovieName[j].match(format)) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(className, "border-true", "margin-between");
      newDiv.id = `letter-${j}`;
      newDiv.innerText = shuffledMovieName[j].toUpperCase();

      element.appendChild(newDiv);
      newDiv.addEventListener("click", (e) => {
        moveLetters(e);
      });
    }
  }
}

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

function moveLetters(event) {
  const titlePlaceHolders = document.querySelectorAll(".title-placeholder");
  if (event.target.parentNode.id === "letter-choice-wrapper") {
    for (i of titlePlaceHolders) {
      if (i.childElementCount <= 0) {
        i.appendChild(event.target);
        event.target.classList.remove("border-true");
        event.target.classList.remove("margin-between");
        break;
      }
    }
  } else {
    letterChoiceWrapper.append(event.target);
    event.target.classList.add("border-true");
    event.target.classList.add("margin-between");
  }
}

function fetchAnswer() {
  const parents = document.querySelectorAll(".title-placeholder");
  let answerStr = "";
  for (p of parents) {
    if (p.childElementCount > 0) {
      const answerLetter = document.querySelector(`#${p.id} .letter-choice`);
      answerStr += answerLetter.innerText.toLowerCase();
    }
  }
  return answerStr;
}
