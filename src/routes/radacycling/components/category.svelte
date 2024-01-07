<script lang="ts">
	import { baseImageRoute } from "../stores";

    export let imageSrc: string;
    export let imageAlt: string;

    export let name: string;
    export let buttonText: string = "Shop Now";

</script>

<div class="category scrollAppear">
    <img src="{baseImageRoute}/{imageSrc}" alt={imageAlt}>
    <div class="text">
        <h2>{name}</h2>
        <button class="button">{buttonText}</button>
    </div>
</div>

<style>
    .category {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
    }

    .category > * {
        grid-column: 1 / -1;
    }

    img, .text {
        grid-row: 1 / -1;
    }

    .text {
        justify-self: center;
        align-self: end;
        margin-bottom: 2rem;
    }

</style>
