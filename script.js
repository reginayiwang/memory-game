const gameContainer = document.getElementById("game");
let firstCard; 
let secondCard;
let numClicks = 0;
let numMatches = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  numClicks++;
  let clickedDiv = event.target;

  if (numClicks <= 2) {
    clickedDiv.style.backgroundColor = clickedDiv.className;
  }
  
  if (numClicks === 1) {
    firstCard = clickedDiv;
  } else if (numClicks === 2) {
    if (firstCard === clickedDiv) {
      numClicks = 1;
      return;
    }

    secondCard = clickedDiv;
    if (firstCard.className === secondCard.className) {
      numMatches++;
      console.log(`You matched ${firstCard.className}!`)
      numClicks = 0;
    } else {
      setTimeout(function() {
        firstCard.style.backgroundColor = "white";
        secondCard.style.backgroundColor = "white";
        numClicks = 0;
      }, 1000
      )
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
