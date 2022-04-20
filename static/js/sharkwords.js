const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;


const createDivsForChars = (word) => {
  // Loop over the chars in `word` and create divs for each char.
  //

  // Get the section of the DOM object with the id=word-container
  const wordContainer = document.querySelector('#word-container');

  // Iterate through each letter of the given word to do the following
  for (const letter of word) {

    // Insert an adjacent HTML element that is a div element at the position right before the end of the section 
    // and assign the following class attributes. Note: section is an inline element. 
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};


const generateLetterButtons = () => {
  // Loop over each letter in `ALPHABET` and generate buttons.
  //

  // Get the section of the DOM object with the id=letter-buttons
  const letterButtonContainer = document.querySelector('#letter-buttons');

  // Iterate through each char of the ALPHABET and do the following
  for (const char of ALPHABET) {

    // Insert an adjacent HTML element that is a button element at the position right before the end of the section
    // and assign the following innerHTMLText
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};


const disableLetterButton = (buttonEl) => {
  // Set the `disabled` property of `buttonEl` to `true.
  //
  // `buttonEl` is an `HTMLElement` object.
  //

  // HTMLSelectElement.disabled is a boolean value; if disabled, the element will no longer accept clicks. 
  buttonEl.disabled = true;
};


// Return `true` if `letter` is in the word.
// If the letter exists as a div element with the class value then the statement will evaluate as true and therefore not 'null'
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// // Alternatively, can access with just `.${letter}`
// const isLetterInWord = (letter) => document.querySelector(`.${letter}`) !== null;


const handleCorrectGuess = (letter) => {
  // Called when `letter` is in word. 
  // Update innerHTMLText of divs with `letter`.
 
  for (const matchingLetter of document.querySelectorAll(`div.${letter}`)) {
    matchingLetter.innerHTML = `${letter}`
  };

};


const handleWrongGuess = () => {
  //
  // Called when `letter` is not in word.source
  //

  // Increment `numWrong` and update the shark image.
  numWrong += 1;

  // Get the current shark image
  const sharkImage = document.querySelector('img');

  // Update the shark image based on numWrong
  sharkImage.setAttribute('src', `/static/images/guess${numWrong}.png`);

  
  // If the shark gets the person (5 wrong guesses), disable
  // all buttons and show the "play again" message.
  if (numWrong === 5) {
    for (const button of document.querySelectorAll('button')) {
      disableLetterButton(button);
    }

    // Show the hidden a element with id=play-again by changing the style.display
    document.querySelector('#play-again').style.display = '';
  }

};


//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  const winningLetters = new Set();
  const setWord = new Set(word);

  for (const button of document.querySelectorAll('button')) {

    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', () => {

      // Disable button so letter cannot be clicked on again
      disableLetterButton(button);

      isLetterInWord

      // Check if the currently clicked letter is in the word
      if (isLetterInWord(button.innerHTML)) {
         // If yes then call handleCorrectGuess
        handleCorrectGuess(button.innerHTML, word);

        // Add the letter to winningLetters
        // Compare the size of the Set(winning Letters)
        // with the Set(word) to check if all letters have been guessed
        if (setWord.has(`${button.innerHTML}`)) {
          winningLetters.add(`${button.innerHTML}`);
        };

        // Display the congratulatory message if won
        if (setWord.size === winningLetters.size) {
          document.querySelector('#win').style.display = '';
        };
         
      }
      else {
        // If no then call handleWrongGuess
        handleWrongGuess();
      }

    } 
    );
  };


  // add an event handler to handle clicking on the Play Again button
  button = document.querySelector('#play-again'); 
  button.addEventListener('click', () => resetGame());

  // add an event handler to handle clicking on the Play Again button
  button = document.querySelector('#win');
  button.addEventListener('click', () => resetGame());
})();
