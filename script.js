'use strict';

//Selecting Elements

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');
const activePlayer0Element = document.querySelector('.player--0');
const activePlayer1Element = document.querySelector('.player--1');

console.log(btnRoll, 'roll');
console.log(btnNew, 'new');

//hide dice
diceElement.classList.add('hidden');

//Change values
let playing = true;
let playerScore0 = 0;
let playerScore1 = 0;

const finalScores = [0, 0];
let currentScore0 = 0;
let activePlayer = 0;

score0Element.textContent = playerScore0;
score1Element.textContent = playerScore1;

//Functions

function init() {
  playing = true;
  playerScore0 = 0;
  playerScore1 = 0;
  finalScores[0] = 0;
  finalScores[1] = 0;
  activePlayer = 0;
  currentScore0 = 0;

  score0Element.textContent = playerScore0;
  score1Element.textContent = playerScore1;
  currentScore0Element.textContent = currentScore0;
  currentScore1Element.textContent = currentScore0;
  diceElement.classList.remove('hidden');
  activePlayer0Element.classList.remove('player--winner');
  activePlayer1Element.classList.remove('player--winner');
  activePlayer0Element.classList.add('player--active');
  activePlayer1Element.classList.remove('player--add');
}
init();

function switchPlayer() {
  currentScore0 = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0Element.classList.toggle('player--active');
  activePlayer1Element.classList.toggle('player--active');
}

//rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. dice roll
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${randomDiceNumber}.png`;
    if (randomDiceNumber !== 1) {
      //add dice to current score

      currentScore0 = currentScore0 + randomDiceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore0;
    } else {
      switchPlayer();

      console.log();
    }
  }
});
//buttonHoldfunctinality

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    //1. add current score to final score

    finalScores[activePlayer] += currentScore0;
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    console.log(`#score--${activePlayer}`);

    if (finalScores[activePlayer] >= 12) {
      playing = false;
      document
        .querySelector(`.player--${[activePlayer]}`)
        .classList.add('player--winner');
      console.log(`.player--${[activePlayer]}`, 'here');
      document
        .querySelector(`.player--${[activePlayer]}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// set active player
//if active player wins-remove player--winner
