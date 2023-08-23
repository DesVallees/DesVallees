<script lang="ts">
	import { dictionary } from "../stores";

    export let linkName : string
    export let edition : string
    export let description : string
    export let price : string

    let link = transformString(linkName)

    function transformString(input: string): string {
        if (input.includes(" ")) {
            return input.replace(/ /g, "-");
        } else {
            const transformed = input.replace(/-/g, " ");
            return transformed
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
    }
    
</script>

<div class="container">
    <div class="guitarInfo">
        <h4>{edition}</h4>
        <p>{description}</p>
    </div>
    
    <div class="guitarInteractive">
        <h3>{price}</h3>
        <a href="ccs/guitarra/{link}">
            <ion-icon style="font-size: 1.6rem;" name="information-circle-outline"></ion-icon> 
            {$dictionary.masInformacion}
        </a>
    </div>
</div>

<style>
    .container {
        display: grid;
        gap: 2em;
        text-transform: uppercase;
    }

    .guitarInfo {
        display: grid;
        gap: .5em;
    }

    h4 {
        font-weight: 100;
        font-size: 1.3rem;
    }
    
    p {
        color: var(--contentDim);
        font-weight: 100;
        font-size: .9rem;
        line-height: 1.5rem;
    }

    .guitarInteractive {
        display: grid;
        gap: 1em;
    }
    
    h3 {
        font-weight: 100;
        font-size: 1.4rem;
    }

    a {
        text-transform: initial;
        padding: .3rem 1rem .3rem .7rem;
        background-color: var(--interactiveDim);
        border: 1px solid var(--interactive);
        border-radius: 20px;
        font-weight: 100;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: fit-content;

        transition: .2s all;
    }

    a:hover,
    a:focus-visible {
        background-color: var(--interactive);
        padding: .3rem 1.2rem .3rem .9rem;
    }

    @media screen and (max-width: 1025px){
        a {
            padding: .3rem 1rem .3rem .7rem;
            border-radius: 20px;
            font-size: 1.1rem;
            gap: 5px;
        }

        h4 {
            font-size: 1.2rem;
        }

        p {
            font-size: .85rem;
        }
    }

</style>