const grid = document.querySelectorAll(".grid");
const imageElements = document.querySelectorAll("img");
var firstCard = null;
var secondCard = null;
let numMatches = 0;
// all images initially hidden
for (let i = 0; i < imageElements.length; i++) {
  imageElements[i].style.visibility = "hidden";
}
// set onclick for each card
var arrGridItems = Array.from(grid[0].children);
arrGridItems = shuffleArray(arrGridItems);
for (let i = 0; i < arrGridItems.length; i++) {
  arrGridItems[i].onclick = clickCard;
}

// shuffles card array
function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function clickCard(ev) {
  if (
    firstCard !== null &&
    firstCard.childNodes[0].style.visibility === "visible"
  ) {
    // click second card
    secondCard = ev.target;
    secondCard.childNodes[0].style.visibility = "visible";
    // matching cards
    if (firstCard.childNodes[0].src === secondCard.childNodes[0].src) {
      numMatches++;
    } else {
      firstCard.childNodes[0].style.visibility = "hidden";
      secondCard.childNodes[0].style.visibility = "hidden";
    }
    firstCard = null;
    secondCard = null;
    // click first card
  } else {
    firstCard = ev.target;
    firstCard.childNodes[0].style.visibility = "visible";
  }
}
function gameOver() {
  return numMatches === arrGridItems.length / 2;
}
// timer
var timeTaken = 0;
var id = setInterval(function () {
  if (gameOver()) {
    clearTimeout(id);
    document.getElementById("time").innerHTML = "Refresh to play again";
    alert("Congrats! Time taken: " + timeTaken + " seconds");
    timeTaken = 0;
  } else {
    document.getElementById("time").innerHTML = timeTaken++;
  }
}, 1000);
