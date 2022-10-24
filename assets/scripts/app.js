const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelMovieInput = document.querySelector(".btn--passive");
const addMovieInput = cancelMovieInput.nextElementSibling;
const movieInfo = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieMessageBtn = document.getElementById("delete-modal");
const moviesLibrary = [];

const updateUI = () => {
  if (moviesLibrary === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const toggleBackDrop = () => {
  backDrop.classList.toggle("visible");
};

const backDropClickHandler = () => {
  closeMovieSection();
  cancelMovieDeletion();
};

const openMovieSection = () => {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
};

const closeMovieSection = () => {
  addMovieModal.classList.remove("visible");
  clearMovieInputs();
};

const renderNewMovie = (id, title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${image}" alt="${title}">
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>`;
  newMovieElement.addEventListener("click", deleteMoviePopUp.bind(null, id));
  const newMovieAddedList = document.getElementById("movie-list");
  newMovieAddedList.append(newMovieElement);
};

const cancelAddMovieButton = () => {
  closeMovieSection();
  clearMovieInputs();
  toggleBackDrop();
};

const clearMovieInputs = () => {
  for (const movieInput of movieInfo) {
    movieInput.value = "";
  }
};

const addMovieButton = () => {
  const movieTitle = movieInfo[0].value;
  const movieImage = movieInfo[1].value;
  const movieRating = movieInfo[2].value;

  if (movieTitle.trim() === "" || movieImage.trim() === "") {
    alert("Please enter valid values.");
    return;
  } else if (movieRating.trim() === "" || movieRating < 1 || +movieRating > 5) {
    alert("Please enter a rating between 1 and 5");
    return;
  }
  const movieToBeAdded = {
    id: Math.random(),
    title: movieTitle,
    image: movieImage,
    rating: movieRating,
  };

  moviesLibrary.push(movieToBeAdded);
  alert("Your movie was added!");

  console.log(moviesLibrary);
  closeMovieSection();
  toggleBackDrop();
  clearMovieInputs();
  renderNewMovie(
    movieToBeAdded.id,
    movieToBeAdded.title,
    movieToBeAdded.image,
    movieToBeAdded.rating
  );
  updateUI();
};

const cancelMovieDeletion = () => {
  deleteMovieMessageBtn.classList.remove("visible");
  toggleBackDrop();
};

const deleteMoviePopUp = (movieId) => {
  deleteMovieMessageBtn.classList.add("visible");
  toggleBackDrop();

  const cancelDeletion = deleteMovieMessageBtn.querySelector(".btn--passive");
  let confirmDeletion = deleteMovieMessageBtn.querySelector(".btn--danger");
  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
  confirmDeletion = deleteMovieMessageBtn.querySelector(".btn--danger");

  cancelDeletion.removeEventListener("click", cancelMovieDeletion);

  cancelDeletion.addEventListener("click", cancelMovieDeletion);
  confirmDeletion.addEventListener("click", movieDeletion.bind(null, movieId));
  console.log(moviesLibrary);
};

const movieDeletion = (movieId) => {
  let movieIndex = 0;
  for (const movie of moviesLibrary) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  moviesLibrary.splice(movieIndex, 1);
  const newMovieAddedList = document.getElementById("movie-list");
  newMovieAddedList.children[movieIndex].remove();
  deleteMovieMessageBtn.classList.remove("visible");
  toggleBackDrop();
};

startAddMovieButton.addEventListener("click", openMovieSection);
backDrop.addEventListener("click", backDropClickHandler);
cancelMovieInput.addEventListener("click", cancelAddMovieButton);
addMovieInput.addEventListener("click", addMovieButton);
