<script lang="ts">
	import { scale } from "svelte/transition";

    export let content: number | string;
</script>


<div transition:scale|global>{content}</div>

<style>

    div{
        position: absolute;
        top: -58px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.5rem;
        color: var(--primary);
    }

</style>