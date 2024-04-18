const dogApi = 'https://dog.ceo/api/breeds/image/random/8';
const pawImg = 'paw.png'
const gameContainer = document.getElementById("game");
const startBtn = document.querySelector("#start");
const restartBtn = document.querySelector("#restart");
let prevCard; 
let numClicks = 0;
let numMatches = 0;
let dogs = []

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivs(arr) {
  for (let item of arr) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    const urlSections = item.split("/")
    newDiv.className = `card ${urlSections[urlSections.length-1]}`;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    const newFront = document.createElement("div");
    newFront.classList.add("cardFront");
    newFront.style.backgroundImage = `url(${pawImg})`;

    const newBack = document.createElement("div");
    newBack.classList.add("cardBack")
    newBack.style.backgroundImage =`url(${item})`;

    newDiv.appendChild(newFront);
    newDiv.appendChild(newBack);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // Ignore clicks on revealed cards, preventing "matches" on the same card and matches 
  // that have already been discovered
  if (event.target.classList[0] === "cardBack") {
    return;
  }

  let clickedCard = event.target.parentElement;
  numClicks++;

  // Flip card, allowing only 2 flipped cards at at ime
  if (numClicks <= 2) {
    clickedCard.childNodes.forEach((div) => {div.classList.toggle('flipped')});
  }
  
  if (numClicks === 1) {
    prevCard = clickedCard;
  } else if (numClicks === 2) {
    // Check if there's a match
    if (prevCard.className === clickedCard.className) {
      numMatches++;
      numClicks = 0;

      // Check if all cards have been matched
      if (numMatches === dogs.length) {
        restartBtn.style.display = "block";
      }
    } else {
      // Flip unmatching cards over after a second
      setTimeout(function() {
        prevCard.childNodes.forEach((div) => {div.classList.toggle('flipped')});
        clickedCard.childNodes.forEach((div) => {div.classList.toggle('flipped')});
        numClicks = 0;
      }, 1000
      )
    }
  }
}

async function getDogPhotos() {
  const response = await fetch(dogApi);
  const data = await response.json();
  return data.message;
}

async function setUpGame(event) {
  event.target.style.display = "none";
  dogs = await getDogPhotos();
  createDivs(shuffle(dogs.concat(dogs)))
}

startBtn.addEventListener("click", setUpGame)

restartBtn.addEventListener("click", function(event) {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  
  numMatches = 0;
  setUpGame(event);
})

restartBtn.style.display = "none";
