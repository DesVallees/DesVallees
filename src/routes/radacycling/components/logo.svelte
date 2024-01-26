<script lang="ts">
	import { theme, dictionary, baseImageRoute } from '../stores';
    
    export let style: string = '';

    let src: string;
    
    function getSource() {
        if ($theme === "light"){
            src = baseImageRoute + "/logoBlack.webp";
        } else {
            src = baseImageRoute + "/logoWhite.webp";
        }
    }

    $: $theme, getSource()

</script>

<img style={style} src={src} alt="Rada Cycling" loading="lazy">

<style>
    img {
        height: auto;
        width: 9rem;
        user-select: none;
        -webkit-user-drag: none;
    }
    
    @media screen and (min-width: 500px) {
        img {
            height: auto;
            width: 13.125rem;
        }
    }
</style>