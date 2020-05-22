<script>
    import { lives } from './store.js';
</script>

<span class="gallows">
    <h1>Gallows</h1>
    <div>Lives: {$lives}</div>
</span>

<style>
    .gallows {
        flex-grow: 1;
        border: 1px #a0aec0 solid;
        border-radius: 3px;
        margin-right: 1em;
        background-color: #f7fafc;
        padding: 0 12px;
        box-shadow: 0px 0px 21px -10px rgba(0,0,0,0.75);
    }
</style>

