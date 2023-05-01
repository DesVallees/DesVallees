<script lang="ts">
	import { dictionary } from "../stores";


    export let key:string;
    export let value:string;
    export let icon:string;

    function camelCaseToSpaced(camel: string): string {
        return camel.replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                    .replace(/^./, str => str.toUpperCase());
    }

</script>

<div>
    <ion-icon name="{icon}-outline"></ion-icon>
    <div class="info">
        <h2>{camelCaseToSpaced(key)}</h2>
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
        font-size: 1.2rem;
    }
</style>