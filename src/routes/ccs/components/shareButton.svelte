<script lang="ts">
	import { dictionary } from "../stores";


    export let url: string;
    export let title: string;
    export let edition: string;
    export let description: string;

    export let justIcon: boolean = true;
    export let style: string = '';

    let shareButton: HTMLButtonElement;
    
    function shareContent() {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: edition + ": " + description,
                url: url,
            })
            .catch((error) => console.error('Error sharing:', error));
        } else {
            shareButton.style.display = 'none'
        }
    }
</script>

<button style={style} bind:this={shareButton} class="baseButton share" on:click={shareContent} aria-label="{$dictionary.compartir}">
    {#if !justIcon}
        {$dictionary.compartir}
    {/if}
    <ion-icon name="share-social-outline"></ion-icon>
</button>

<style>

    .share{
        display: flex;
        align-items: center;
        gap: 1em;
        border-radius: 50px;
        z-index: 1;
        font-size: clamp(1.1rem, 3vw, 1.25rem);
        font-weight: normal;
        color: var(--contentDim);
    }
    
    .share ion-icon {
        font-size: 2rem;
        transform: translateX(-3px);
    }

</style>