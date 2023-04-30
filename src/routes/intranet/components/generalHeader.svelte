<script lang="ts">
	import { dictionary } from "../stores";

    export let searchValue:string = '';
</script>


<div>
    <h1>{$dictionary.generalTitle}</h1>
    <h2>{$dictionary.generalSubtitle}</h2>
    <input type="text" placeholder={$dictionary.search} bind:value={searchValue} >
</div>


<style>    
    div {
        width: 100%;
        max-width: 700px;
        display: flex;
        flex-direction: column;
        margin-bottom: 3em;
        gap: 2em;
    }

    h1 {
        font-size: 3.75rem;
        line-height: 3.5rem;
    }

    h2 {
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: var(--contentDim);
    }

    input {
        background-color: rgba(9, 5, 41, 0.185);
        border-radius: 15px;
        padding: .7em 1em;
        border: 2px var(--contentDim) solid;
        width: 100%;
    }
    
    input:focus {
        outline: none;
        border: 2px var(--content) solid;
    }
</style>