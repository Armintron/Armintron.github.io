const guessBar = document.getElementById("guessBar");
const submitButton = document.getElementById("submitButton");
const imageHolder = document.getElementById("imageHolder");
const heartText = document.getElementById("heartText");
const container = document.getElementById("container");

let timerPlaying = false;
let timerSeconds = 0;
const timertext = document.getElementById("timer-text");
const timerButton = document.getElementById("timer-button");

setInterval(function updateTimer() {
  if (!timerPlaying)
  {
    return;
  }

  timerSeconds += 1;
  
  const secsInMin = 5;
  if (timerSeconds == 3 * secsInMin)
  {
    var voiceQuip = new Audio('First.mp3');
    voiceQuip.play();
  }
  else if (timerSeconds == 6 * secsInMin)
  {
    var voiceQuip = new Audio('Second.mp3');
    voiceQuip.play();
  }
  else if (timerSeconds == 9 * secsInMin)
  {
    var voiceQuip = new Audio('Third.mp3');
    voiceQuip.play();
  }
  else if (timerSeconds == 12 * secsInMin)
  {
    var voiceQuip = new Audio('Fourth.mp3');
    voiceQuip.play();
  }
}, 1000); // update about every second

function handleTimerButton()
{  
  timerPlaying = !timerPlaying;
  if (timerPlaying)
  {
    container.getAnimations()[0].play();
    timerButton.innerText = "Pause";
  }
  else
  {
    container.getAnimations()[0].pause();
    timerButton.innerText = "Start";
  }
}

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
  timerButton.classList.add("fadeOut");
  timerPlaying = false;

  
  setTimeout(() =>
    {
      imageHolder.classList.add("imageHolder");
      showHearts(imageHolder);
      var voiceQuip = new Audio('Last.mp3');
      voiceQuip.play();
      
    setTimeout((() => {
      let guessBarDiv = document.getElementById("guessBarDiv");
      let submitButtonDiv = document.getElementById("submitButtonDiv");
      imageHolder.style.pointerEvents = "none";
      guessBarDiv.style.display = "none";
      submitButtonDiv.style.display = "none";

      let cameraBox = document.getElementById("camera-box");
      showHearts(cameraBox);
      cameraBox.style.display = "";
      }), 57 * 1000);
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

function showHearts(heartHolder) {
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
      heartHolder.appendChild(newSpan);
    }
  }
  
  heartAnimation();
}

window.onload = function ()
{
  container.getAnimations()[0].pause();
  
  // Ask for camera permissions
  navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
}

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const pictureButton = document.getElementById("start-button");
let takingPicture = true;

pictureButton.addEventListener("click", (ev) => {
  takePicture();
  ev.preventDefault();
});

function takePicture() {
  takingPicture = !takingPicture;
  
  if (takingPicture)
    {
    video.play();
    pictureButton.innerText = "Take Picture!"
  }
  else
  {
    video.pause();
    pictureButton.innerText = "Retake?"
  }
}