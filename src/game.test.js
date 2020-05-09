// @format
import Game, {NotALetterError, GuessedLetterError} from './game';

let game;

beforeEach(() => {
  game = new Game();
  game.setWord('jazz');
});

test('can be created', () => {
  expect(game.getState()).toStrictEqual(['_', '_', '_', '_']);
  expect(game.guessedLetters.size).toBe(0);
});

describe('guessLetter/getState', () => {
  test('allows guessing valid letters', () => {
    game.guessLetter('j');
    expect(game.getState()).toStrictEqual(['j', '_', '_', '_']);

    game.guessLetter('z');
    expect(game.getState()).toStrictEqual(['j', '_', 'z', 'z']);
  });

  test('auto converts capital letters for you', () => {
    game.guessLetter('Z');
    expect(game.getState()).toStrictEqual(['_', '_', 'z', 'z']);
  });

  test('decrements life for wrong letters', () => {
    game.guessLetter('j');
    expect(game.lives).toBe(6);
    game.guessLetter('f');

    expect(game.lives).toBe(5);

    game.guessLetter('a');

    expect(game.lives).toBe(5);
    expect(game.getState()).toStrictEqual(['j', 'a', '_', '_']);
    expect(game.guessedLetters.has('f')).toBeTruthy();
    expect(game.guessedLetters.has('j')).toBeTruthy();
  });

  test('prevents more than one char', () => {
    expect(() => {
      game.guessLetter('jAz');
    }).toThrowError(NotALetterError);
  });

  test('prevents non-alphabetical guesses', () => {
    expect(() => {
      game.guessLetter('3');
    }).toThrowError(NotALetterError);
  });

  test('prevents repeated guesses', () => {
    game.guessLetter('A');
    expect(game.getState()).toStrictEqual(['_', 'a', '_', '_']);

    expect(() => {
      game.guessLetter('a');
    }).toThrowError(GuessedLetterError);
  });
});

describe('gameOver/hasLost/hasWon', () => {
  test('can verify if game has won', () => {
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('a');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('j');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('q');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('z');
    expect(game.hasWon()).toBeTruthy();
    expect(game.hasLost()).toBeFalsy();
  });

  test('can verify if a game has lost', () => {
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('a');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('b');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('c');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('d');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('e');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('f');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();

    game.guessLetter('g');
    expect(game.hasWon()).toBeFalsy();
    expect(game.hasLost()).toBeTruthy();
    expect(game.gameOver()).toBeTruthy();
  });
});
