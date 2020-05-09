<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let letter;

    function guessLetter() {
        dispatch('guessLetter', {
            letter,
        });
        letter = '';
    }
</script>

<main>
    <input bind:value={letter}>
    <button on:click={guessLetter}>Guess Letter</button>
</main>
