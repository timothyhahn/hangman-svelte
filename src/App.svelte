<script>
    import Game, {
        NotALetterError,
        GuessedLetterError,
        GameOverError,
    } from './game';
    import { lives, state, guessedLetters } from './store';

    import Gallows from './Gallows.svelte';
    import LetterGuesser from './LetterGuesser.svelte';
    import Hint from './Hint.svelte';
    import GuessedLetters from './GuessedLetters.svelte';

    let game = new Game();

    let error;
    let gameOver;

    // Set store values
    function updateStores() {
        gameOver = null;
        lives.set(game.lives);
        state.set(game.getState());
        guessedLetters.set(Array.from(game.guessedLetters));
        if (game.hasWon()) {
            error = null;
            gameOver = 'You won!';
        }
        if (game.hasLost()) {
            error = null;
            gameOver = `You lost, the word was "${game.targetWord}"`
        }
    }

    function guessLetter(event) {
        error = null;
        try {
            game.guessLetter(event.detail.letter);
        } catch (e) {
            if (e instanceof NotALetterError) {
                error = 'Not a valid letter';
            } else if (e instanceof GuessedLetterError) {
                error = 'You\'ve already guessed this letter';
            } else if (e instanceof GameOverError) {
                error = 'Game is already over.';
            } else {
                error = e;
            }
        }
        updateStores();
    }

    function newGame() {
        game = new Game();
        updateStores();
    }

    updateStores();
</script>

<main> 
    <div class="upper">
        <Gallows />
        <GuessedLetters />
    </div>
    <div class="break"></div>
    <div class="lower">
        <Hint />
        <LetterGuesser on:guessLetter={guessLetter} />
        {#if gameOver}
            <div>
                {gameOver}
                <button on:click={newGame}>New Game</button>
            </div>
        {/if}

        {#if error}
            <div>
                Error: {error}
            </div>
        {/if}
    </div>
</main>

<style>
	main {
        display: flex;
        flex-wrap: wrap;
        width: 60%;
        margin-left: auto;
        margin-right:auto;
	}
    .upper {
        display: flex;
        flex-grow: 1;
        justify-content: space-evenly;
        height: 20em;
    }
    .break {
        flex-basis: 100%;
        height: 0;
    }
    .lower {
        display: flex;
        flex-grow: 5;
        flex-direction: column;
        align-items: center;
        border: 1px #a0aec0 solid;
        bodrer-radius: 12px;
        margin-top: 2em;
        background-color: #f7fafc;
    }
</style>
