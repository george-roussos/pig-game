'use strict';

// Select Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnInstr = document.querySelector('.btn--instr');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const players = document.getElementsByClassName('player');

let scores, currentScore, activePlayer, isPlaying;

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  for (let i = 0; i < players.length; i++) {
    players[i].classList.remove('player--winner');
  }

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
}

// Start the game
init();

// Generate random roll of dice
function hiddenNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Switch player
function nextPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle('player--active');
  }
}

// Assign win
function winner(player) {
  player = document
    .querySelector(`.player--${player}`)
    .classList.toggle('player--winner');
}

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const roll = hiddenNum(1, 5);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${roll}.png`;
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      nextPlayer();
    }
  }
});

// Hold score
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      winner(activePlayer);
      diceEl.classList.add('hidden');
    } else {
      nextPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener('click', init);

// Modal with instructions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnInstr.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key == 'Escape') {
    if (!modal.classList.contains('hidden')) closeModal();
  }
});
