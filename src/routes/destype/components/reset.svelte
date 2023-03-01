<script lang="ts">
    export let resetGame: () => void;
</script>

<div>
    <button aria-label="reset" on:click={resetGame}>
        <ion-icon name="refresh-outline"></ion-icon>
    </button>
</div>

<style>

    div {
        width: 100%;
        display: grid;
        justify-content: center;
        transform: rotateY(180deg);
    }
    
</style>