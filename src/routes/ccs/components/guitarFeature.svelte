<script lang="ts">
	import type { Feature } from "../database";
	import { dictionary } from "../stores";


    export let feature:Feature

    let icon = {
        "personalizable": "brush-outline",
        "fabricacionCompleta": "hammer-outline",
        "conForro": "shield-checkmark-outline",
        "garantia": "checkmark-circle-outline",
    }
    
</script>

<div>
    <ion-icon name={icon[feature]}></ion-icon>
    
    <span>
        {$dictionary[feature]}
    </span>
</div>

<style>
    div {
        max-width: 20ch;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }

    ion-icon {
        font-size: 5rem;
    }

    span {
        font-size: clamp(1.1rem, 3vw, 1.15rem);;
        text-align: center;
    }
</style>