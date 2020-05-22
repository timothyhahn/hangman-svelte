import randomWords from 'random-words';

// @format
export default class Game {
  constructor() {
    // get random word and save it
    const randomWord = randomWords();
    this.setWord(randomWord);
    // valid chars
    this.alphabet = new Set('abcdefghijklmnopqrstuvwxyz');
  }

  // largely exists for testing
  setWord(word) {
    this.targetWord = word;
    this.targetSet = new Set(word);

    // array that models the currently verified letters
    this.currentState = [];

    // set of guessed letters
    this.guessedLetters = new Set();

    this.lives = 8;
  }

  static placeholderChar() {
    return '_';
  }

  hasWon() {
    return this.currentState.join('') === this.targetWord;
  }

  hasLost() {
    return this.lives <= 0;
  }

  gameOver() {
    return this.hasWon() || this.hasLost();
  }

  guessLetter(letter) {
    letter = letter.toLowerCase();

    if (this.gameOver()) {
      throw new GameOverError('Game is already over');
    }

    if (!this.alphabet.has(letter)) {
      throw new NotALetterError('Not a letter');
    }

    if (this.guessedLetters.has(letter)) {
      throw new GuessedLetterError('Already guessed');
    }

    this.guessedLetters.add(letter);
    this.currentState = this.getState();
    if (this.targetSet.has(letter)) {
      return true;
    } else {
      this.lives--;
      return false;
    }
  }

  // goes through the target word and if the letter has been guessed, return it
  getState() {
    return Array.prototype.map.call(this.targetWord, letter =>
      this.guessedLetters.has(letter) ? letter : Game.placeholderChar(),
    );
  }
}

export class NotALetterError extends Error {
  constructor(...params) {
    super(...params);
  }
}

export class GuessedLetterError extends Error {
  constructor(...params) {
    super(...params);
  }
}

export class GameOverError extends Error {
  constructor(...params) {
    super(...params);
  }
}
