<script lang="ts">
	import { dictionary, language } from "../stores";


    export let key:string;
    export let value:unknown;
    export let icon:string;

    let property: string;
    
    $: $language, property = ($dictionary as any)[key]

</script>

<div>
    <ion-icon name="{icon}-outline"></ion-icon>
    <div class="info">
        <h2>{property}</h2>
        <p>{value || $dictionary.unknown}</p>
    </div>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        column-gap: 1em;
    }

    ion-icon {
        font-size: 2rem;
    }

    .info {
        flex-direction: column;
        justify-content: center;
        align-items: baseline;
    }

    h2 {
        color: var(--contentDim);
        font-size: .9rem;
    }

    p {
        font-size: 1.1rem;
        max-width: calc(100vw - 60px - 3rem - 1em); 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
        line-height: 2.1rem;
        color: var(--content);
    }
</style>