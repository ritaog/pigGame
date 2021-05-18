'use strict';

window.onload = pigGame;

function pigGame() {
  //variables
  let scores, currentScore, activePlayer, playing, totalScore;

  //Selecting elements
  const player0El = document.querySelector('.player--0');
  const player1El = document.querySelector('.player--1');

  const score0El = document.querySelector('#score--0');
  const score1El = document.querySelector('#score--1');

  const current0El = document.getElementById('current--0');
  const current1El = document.getElementById('current--1');

  const diceEl = document.querySelector('.dice');
  const btnNew = document.querySelector('.btn--new');
  const btnRoll = document.querySelector('.btn--roll');
  const btnHold = document.querySelector('.btn--hold');

  //initializes the game
  init();

  //event to handle rolling dice
  btnRoll.addEventListener('click', rollDice);

  //event to handle holding scores
  btnHold.addEventListener('click', holdScores);

  //game back at status quo
  btnNew.addEventListener('click', init);

  // functions init, rollDice, and holdScores
  function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    totalScore = 100;

    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }

  //Rolling dice functionality
  function rollDice() {
    if (playing) {
      //1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      //2. Display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      //3. Check for rolled 1
      if (dice !== 1) {
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  }

  //implementing holding of scores
  function holdScores() {
    if (playing) {
      //1. add current score to the active player's total score
      scores[activePlayer] += currentScore;
      //2. display the score
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      //3. check if player's score >= 100
      if (scores[activePlayer] >= totalScore) {
        //finish the game
        //add a class which changes the background color of winner
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        // stop this player from being the active player
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');

        playing = false;
        diceEl.classList.add('hidden');
      } else {
        //switch player
        switchPlayer();
      }
    }
  }

  // switch player
  function switchPlayer() {
    //current player's score becomes 0
    currentScore = 0;

    //display current player's score
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;

    //change background color of next player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}
