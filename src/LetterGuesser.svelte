<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let letter;

    function handleInput(event) {
        dispatch('guessLetter', {
            letter,
        });
        letter = '';
    }
</script>

<main>
    <input bind:value={letter} on:keyup={handleInput} placeholder="Guess a Letter">
</main>
