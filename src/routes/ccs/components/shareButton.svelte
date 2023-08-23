<script lang="ts">

    let shareButton: HTMLButtonElement;
    
    function shareContent() {
        if (navigator.share) {
            navigator.share({
                title: 'CCS',
                text: '...',
                url: window.location.href,
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
        position: absolute;
        bottom: 30px;
        right: 30px;
        border-radius: 50px;
        z-index: 1;
    }

    .share ion-icon {
        font-size: 2rem;
        transform: translateX(-3px);
        color: var(--contentDim);
    }

</style>