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

function flashButton()
{
  guessBar.classList.remove("flashClass");
  guessBar.offsetWidth; // trigger reflow so animation plays again
  guessBar.classList.add("flashClass");
}

function correctAnswer() {
  flashButton();
}

function wrongAnswer() {
  flashButton();
}

function onEnterPress(event) {
  // Login when enter is pressed in any of the inputs
  if (event.key === "Enter" && !event.repeat) {
    // Cancel the default action
    event.preventDefault();
    sendGuess();
  }
}
