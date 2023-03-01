<script lang="ts">
	import Tooltip from "./tooltip.svelte";

    export let tooltip: string | boolean = false
    export let title: string;
    export let score: string | number;
</script>

<div>
    <Tooltip tooltip={tooltip}>
        <p class="title">{title}</p>
        <p class="score">{score}</p>
    </Tooltip>
</div>

<style> 
    .title {
        font-size: 2rem;
        color: var(--fg-200);
    }

    .score {
        font-size: 4rem;
        color: var(--primary);
    }
</style>