/*
 * Create a list that holds all of your cards
 */

 var deck = document.querySelector('.deck');
 var cardOrder = ['fa-paper-plane-o', 'fa-paper-plane-o', 'fa-diamond', 'fa-diamond', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
 var openCards = [];
 var matchedCards = [];
 let moves = 0;
 let match = 0;
 let starCount = 0;
 let pop = document.querySelector('.myPopup');
 let popText = document.querySelector('.popuptext');
 var secs = 0;
 var minutes = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cardOrder);

// Restart
// Timer


//function to start the game
  function startGame () {
  makeCards();
  timer();
};

//starts the game when the window opens
startGame();
//time


function timer() {
  var counter = document.querySelector('.clock');

  function time() {
    if (secs = 60) {
      minutes++
      secs = 0;
      secs++
    } ;
  };
      setInterval(function(){
          secs++;
          if (secs <  10  ) {
            counter.innerHTML = `${minutes}:0${secs}`;
          } else if (secs > 59){
            minutes++
            secs = 0
            counter.innerHTML = `${minutes}:${secs}`;
          } else {
            counter.innerHTML = `${minutes}:${secs}`
          }
          ;
          console.log(secs);
      },
      1000);
}

function showTime() {
  var watch = document.querySelector(".clock")
  watch.innterHTML = secs;
}

function stopTimer () {
  clearInterval(timer);
}

//restart function

var restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
  clearCards();
  clearPop();
  moves = 0;
  match = 0;
  starCount = 0;
  openCards = [];
  matchedCards = [];
  makeCards();
  secs = 0;
  minutes = 0;
}
);

var endStartNew = document.querySelector('.newGame');
endStartNew.addEventListener('click', function() {
  pop.style.visibility = 'hidden';
  popText.style.visibility = 'hidden';
  clearCards();
  clearPop();
  moves = 0;
  match = 0;
  starCount = 0;
  openCards = [];
  matchedCards = [];
  makeCards();
}
);

function clearPop() {
}

//create and shuffle the list of cards

 function makeCards() {
 shuffle(cardOrder);
 for (cardsOrder of cardOrder) {
 var newCard = document.createElement('li');
 deck.append(newCard);
 newCard.classList.add('card');
 var info = document.createElement('i');
 newCard.appendChild(info);
 info.classList.add("fa");
 info.classList.add(cardsOrder);
}

// add event listeners to each card
 var cards = document.querySelectorAll('.card');
 cards.forEach(function(card){
  card.addEventListener('click', function(e){
//if the card is not already open or matched then open the card
 if(!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show') && openCards.length < 2) {

     openCards.push(card);
     card.classList.add('open', 'show')
     var firstCard = openCards[0]
     var secondCard = openCards[1]
//once the cards are open test if they are equal, if so add them to the Matched list
     if(openCards.length == 2)
     {  if(firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
       addMove();
       removeStars();
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matchedCards.push(openCards);
        match++;
        openCards = [];
        if (match === 8) {
          youWin();
        };
      }
// if they are not equal, reset them to unopened
      else {
        addMove();
        removeStars();
       setTimeout(function () {
         console.log(openCards);
       openCards.forEach(function(card) {
         card.classList.remove('open','show')
       })
       openCards = [];
     }, 1000);
   }}
}
  })
});
};
//creates the pop-up when you win the game
function youWin() {
  pop.style.visibility = 'visible';
  popText.style.visibility = 'visible';
  var finalMoves = document.querySelector('.fMoves');
  finalMoves.innerHTML = "Moves: " + moves + " Moves";
  var finalTime = document.querySelector('.ftime');
  finalTime.innerHTML = "Time: " + `${minutes}:${secs}`;
  var finalStar = document.querySelector('.fstars');
  finalStar.innerHTML = "Stars: " + starCount;
};

function showStars () {
  var showS = document.querySelectorAll('fa fa-star');
  for (starX of starTrack) {
    if (starX.style.visibility !== 'hidden') {
      starCount++;
    };
  };
  return starCount;
  console.log(starCount);
};

//Adds and increments the number of moves
function addMove () {
moves++;
var numMoves = document.querySelector('.moves');
numMoves.innerHTML = moves;
}

//removes Stars after a certain number of moves

function removeStars() {
  var num = 0
  if (moves < 10) {
    num = 1;
  } else if (moves < 15) {
    num = 2;
  } else if (moves < 20) {
    num = 3;
  }else {
    num = 4;
  }

  var minusStar = document.querySelector(`.stars li:nth-child(${num})`);
  minusStar.classList.add('hidden');
};

//clears the board of existing game plays
function clearCards () {
  while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
}
};
