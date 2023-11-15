<script lang="ts">

    export let url: string;
    export let title: string;
    export let description: string;
    let shareButton: HTMLButtonElement;
    
    function shareContent() {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: url,
            })
            .catch((error) => console.error('Error sharing:', error));
        } else {
            shareButton.style.display = 'none'
        }
    }
</script>

<button bind:this={shareButton} class="baseButton share" on:click={shareContent}>
    <ion-icon name="share-social-outline"></ion-icon>
</button>

<style>

    .share{
        border-radius: 50px;
        z-index: 1;
    }

    .share ion-icon {
        font-size: 2rem;
        transform: translateX(-3px);
        color: var(--contentDim);
    }

</style>