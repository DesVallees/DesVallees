<script lang="ts">
	import { slide } from "svelte/transition";
	import Base from "./base.svelte";
	import PrimaryNav from "./primaryNav.svelte";

    export let active : boolean = false;

    let firstFocusableElement: HTMLAnchorElement;
    let lastFocusableElement: HTMLAnchorElement;

</script>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement} hasStopPropagationChild={true}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation transition:slide={{duration:200, axis: 'x'}}>
        <PrimaryNav linkBehaviourCallback={() => {active = false}} bind:firstFocusableElement bind:lastFocusableElement />
    </div>
</Base>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        height: 100dvh;
        z-index: 2;

        background-color: var(--main);
    }

    @media screen and (min-width: 850px) {
        div {
            display: none;
        }
    }
</style>