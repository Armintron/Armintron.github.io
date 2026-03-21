const urlBase = "http://ourcontactmanager.rocks/API";
const guessBar = document.getElementById("guessBar");

let answer = "VOCAL";

guessBar.addEventListener("keydown", onEnterPress);

function sendGuess() {
  if (guessBar.value === answer) {
    correctAnswer();
  }
  else {
    wrongAnswer();
  }
}

function correctAnswer() {
  guessBar.classList.remove("flashClass");
  guessBar.offsetWidth; // trigger reflow so animation plays again
  guessBar.classList.add("flashClass");
}

function wrongAnswer() {
  guessBar.classList.remove("wrongFlash");
  guessBar.offsetWidth; // trigger reflow so animation plays again
  guessBar.classList.add("wrongFlash");
}

function onEnterPress(event) {
  // Login when enter is pressed in any of the inputs
  if (event.key === "Enter" && !event.repeat) {
    // Cancel the default action
    event.preventDefault();
    sendGuess();
  }
}
