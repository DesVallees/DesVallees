<script lang="ts">
	import { dictionary } from "../stores";


</script>

<div>
    {$dictionary.noFeaturedEvents}
</div>

<style>
    div {
        width: 200px;
        height: 60%;
        border: 1px solid var(--contentDim);
        border-radius: 50px;
        margin: 1em 0;

        display: grid;
        place-content: center;
        padding: 2em;
        font-size: 1.1rem;
        text-align: center;
    }
</style>