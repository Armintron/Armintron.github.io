const guessBar = document.getElementById("guessBar");
const submitButton = document.getElementById("submitButton");
const imageHolder = document.getElementById("imageHolder");
const heartText = document.getElementById("heartText");

let answer = "VOCAL";

guessBar.addEventListener("keydown", onEnterPress);

function sendGuess() {
  if (imageHolder.shown)
  {
    return;
  }

  var guess = guessBar.value.toUpperCase();
  if (guess === answer) {
    correctAnswer();
  }
  else {
    wrongAnswer();
  }
}

function correctAnswer() {
  imageHolder.shown = true;
  guessBar.classList.remove("rightFlash");
  guessBar.offsetWidth; // trigger reflow so animation plays again
  guessBar.classList.add("rightFlash");
  guessBar.classList.add("fadeOut");
  submitButton.classList.add("fadeOut");

  setTimeout(() =>
  {
    imageHolder.classList.add("imageHolder");
    showHearts();
  }, 3 * 1000);
  
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

function showHearts() {
  // Get random number between 2 ranges
  function randomNum(m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }
  
  function heartAnimation() {
    $this = heartText;
    var heartCount = 100;
    for (var i = 0; i< heartCount; i++) {
      var heartSize = (randomNum(120, 240) / 10);
      var newSpan = document.createElement('div');
      var sideToPutHeart = randomNum(0, 1) == 0 ? 'left' : 'right';
      newSpan.innerHTML = '<span class="tiny-heart" style="top: ' + randomNum(-20, 120) + '%;' + sideToPutHeart + ': ' + randomNum(10, -30) + '%; width: ' + heartSize + 'px; height: ' + heartSize + 'px ; animation-delay: -' + randomNum(0, 3) + 's; animation-duration: ' + randomNum(2, 5) + 's"></span>';
      imageHolder.appendChild(newSpan);
    }
  }
  
  heartAnimation();
}