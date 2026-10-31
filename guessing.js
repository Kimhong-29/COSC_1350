
"use strict";

let randomNumber = Math.floor(Math.random() * 100) + 1;

let guessCount = 0;

const guessForm = document.getElementById("guessForm");
const guessField = document.getElementById("guessField");
const guessSubmit = document.getElementById("guessSubmit");

const guesses = document.getElementById("guesses");
const lastResult = document.getElementById("lastResult");
const lowOrHi = document.getElementById("lowOrHi");
const restartButton = document.getElementById("restartButton");

function checkGuess(event) {
    event.preventDefault();

    let userGuess = Number(guessField.value);

    if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
        lowOrHi.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    guessCount++;

    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: " + userGuess;
    } else {
        guesses.textContent += ", " + userGuess;
    }

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lowOrHi.textContent = "";
        endGame();
    } else if (guessCount === 10) {
        lastResult.textContent = "Game Over! The number was " + randomNumber;
        lowOrHi.textContent = "";
        endGame();
    } else {
        lastResult.textContent = "Wrong guess!";

        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Your guess was too low!";
        } else {
            lowOrHi.textContent = "Your guess was too high!";
        }
    }

    guessField.value = "";
    guessField.focus();
}

function endGame() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    restartButton.hidden = false;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;

    guesses.textContent = "";
    lastResult.textContent = "";
    lowOrHi.textContent = "";

    guessField.value = "";
    guessField.disabled = false;
    guessSubmit.disabled = false;

    restartButton.hidden = true;
    guessField.focus();
}

guessForm.addEventListener("submit", checkGuess);
restartButton.addEventListener("click", resetGame);
