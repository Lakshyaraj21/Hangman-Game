import React, { useState, useEffect } from 'react';

// List of words to guess from
const wordList = ['apple', 'banana', 'cherry', 'grape', 'orange', 'melon'];

const Hangman = () => {
  const [word, setWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [triedLetters, setTriedLetters] = useState([]);
  const [message, setMessage] = useState('');

  // Initialize a random word at the start of the game
  useEffect(() => {
    const newWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    setWord(newWord);
    setCurrentGuess(Array(newWord.length).fill('_'));
  }, []);

  // Function to handle letter guessing
  const guessLetter = (letter) => {
    letter = letter.toLowerCase();

    // Prevent guessing the same letter or guessing after the game is over
    if (triedLetters.includes(letter) || remainingAttempts === 0 || currentGuess.join('') === word) {
      return;
    }

    // Add the letter to the list of tried letters
    setTriedLetters([...triedLetters, letter]);

    // Check if the letter is in the word
    if (word.includes(letter)) {
      const updatedGuess = currentGuess.map((char, i) => (word[i] === letter ? letter : char));
      setCurrentGuess(updatedGuess);

      // Check if the player has won the game
      if (updatedGuess.join('') === word) {
        setMessage(`Congratulations! You've guessed the word: ${word}`);
        document.getElementById('message').classList.add('success'); // Add success class for styling
      }
    } else {
      // Decrease attempts for incorrect guesses
      setRemainingAttempts(remainingAttempts - 1);

      // Check for a loss
      if (remainingAttempts - 1 === 0) {
        setMessage(`Game over! The word was: ${word}`);
      }
    }
  };

  // Handle input and prevent default form behavior
  const handleInput = (e) => {
    if (e.key === 'Enter') {
      const letter = e.target.value;
      if (letter && /^[a-zA-Z]$/.test(letter)) {
        guessLetter(letter);
        e.target.value = ''; // Clear the input after guessing
      }
    }
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>{currentGuess.join(' ')}</p>
      <input
        type="text"
        maxLength="1"
        onKeyPress={handleInput}
        disabled={remainingAttempts === 0 || currentGuess.join('') === word}
      />
      <p id="remaining-attempts">Remaining attempts: {remainingAttempts}</p>
      <p id="tried-letters">Tried letters: {triedLetters.join(', ') || 'None'}</p>
      <p id="message" className={message.includes('Congratulations') ? 'success' : ''}>{message}</p>
    </div>
  );
};

export default Hangman;
