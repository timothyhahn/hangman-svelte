<script>
    import Game from './game';
    import { lives, state, guessedLetters } from './store';

    import Gallows from './Gallows.svelte';
    import LetterGuesser from './LetterGuesser.svelte';
    import Hint from './Hint.svelte';
    import GuessedLetters from './GuessedLetters.svelte';

    const game = new Game();

    // Set store values
    function updateStores() {
        lives.set(game.lives);
        state.set(game.getState());
        guessedLetters.set(Array.from(game.guessedLetters));
    }

    function guessLetter(event) {
        game.guessLetter(event.detail.letter);
        updateStores();
    }

    updateStores();
</script>

<main>
    <Gallows />
    <GuessedLetters />
    <Hint />
    <LetterGuesser on:guessLetter={guessLetter} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
