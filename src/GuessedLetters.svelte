<script>
    import { guessedLetters } from './store.js';
</script>

<span class="guessed-letters">
    <h1>Already Guessed Letters: </h1>
    <div class="letters">
        {$guessedLetters.join(' ')}
    </div>
</span>

<style>
    .guessed-letters {
        flex-grow: 1;
        border: 1px #a0aec0 solid;
        bodrer-radius: 12px;
        background-color: #f7fafc;
        padding: 0 12px;
        box-shadow: 0px 0px 21px -10px rgba(0,0,0,0.75);
    }
    .letters {
        font-size: 24px;
    }
</style>
