<script lang="ts">
	import { theme, dictionary } from '../stores';
    
    export let style: string = '';

    let src: string;
    
    function getSource() {
        if ($theme === "light"){
            src = "/images/lawyers/logoBlack.webp";
        } else {
            src = "/images/lawyers/logoWhite.webp";
        }
    }

    $: $theme, getSource()

</script>

<img style={style} src={src} alt="{$dictionary.attorneyCollaborativeOnlineService}" loading="lazy">

<style>
    img {
        width: 3.5rem;
        user-select: none;
        -webkit-user-drag: none;
    }

    @media screen and (min-width: 500px) {
        img {
            width: 4rem;
        }
    }
</style>