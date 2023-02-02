import { dictionary } from './dictionary.js';

const rounds = 6;
let currentRound = 1;
let selectedWord = generateWord();

const checkBtn = document.querySelector('.check-btn');
checkBtn.addEventListener('click', getWord);

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', resetGame);

function generateWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function getCurrentInputs() {
    return document.querySelectorAll(`input[id^='row${currentRound}']`);
}

function startRound() {
    let lettersInputs = getCurrentInputs();
    lettersInputs.forEach(input => {
        input.addEventListener('change', enableCheckBtn);
    });
}

function enableCheckBtn() {
    let enteredLetters = 0;
    const letters = getCurrentInputs();
    letters.forEach(input => {
        if (input.value !== '') {
            ++enteredLetters;
        } else if (enteredLetters > 0) {
            --enteredLetters;
        }
    });

    checkBtn.disabled = enteredLetters !== letters.length;
}

function isInDictionary(word) {
    return dictionary.includes(word);
}

function getWord() {
    let letters = [...document.querySelectorAll('input:not([readonly])')];
    const word = letters.map(input => input.value).join('');
    if (!isInDictionary(word)) {
        alert('Entered word is not in dictionary.');
    } else if (word === selectedWord) {
        letters.forEach(input => {
            input.style.backgroundColor = 'green';
        });
        alert('Congratulations! You won.');
        checkBtn.disabled = true;
    } else {
        wordsComparison(word, letters);
    }
}

function setNextRow(letters) {
    letters.forEach(input => {
        input.readOnly = true;
    });
    letters = [...getCurrentInputs()];
    letters.forEach(input => {
        input.readOnly = false;
    });
}

function wordsComparison(word, letters) {
    const selectedWordLetters = selectedWord.split('');
    const wordLetters = word.split('');
    wordLetters.forEach((letter, index) => {
        if (letter === selectedWordLetters[index]) {
            letters[index].style.backgroundColor = 'green';
        } else if (selectedWordLetters.includes(letter)) {
            letters[index].style.backgroundColor = 'yellow';
        } else {
            letters[index].style.backgroundColor = 'gray';
        }
    });

    ++currentRound;

    if (currentRound > rounds) {
        alert('Game over.');
    } else {
        setNextRow(letters);
        startRound();
    }
    checkBtn.disabled = true;
}

function resetGame() {
    window.location.reload();
}

startRound();