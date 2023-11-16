<script lang="ts">
	import { dictionary } from "../stores";
	import ShareButton from "./shareButton.svelte";

    export let name : string
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
    <h4>{edition}</h4>
    <p>{description}</p>

    <h3>{price}</h3>
    <div class="interactives">
        <a href="ccs/guitarra/{link}" class="button">
            <ion-icon name="information-circle-outline"></ion-icon> 
            {$dictionary.masInformacion}
        </a>
        <div class="share">
            <ShareButton url="ccs/guitarra/{link}" title={name} description={description}/>
        </div>
    </div>
    </div>

<style>
    .container {
        display: grid;
    }

    h4 {
        font-weight: 100;
        text-transform: uppercase;
        font-size: 1.3rem;
    }
    
    p {
        color: var(--contentDim);
        font-weight: 100;
        font-size: 1rem;
        line-height: 1.5rem;
        margin-top: .5em;
        margin-bottom: 2em;
    }

    h3 {
        font-weight: 100;
        font-size: 1.4rem;
    }

    .interactives {
        display: flex;
        margin-top: .5em;
        gap: 1em;
        align-items: center;
    }
    
    a ion-icon {
        font-size: 1.6rem;
    }

    @media screen and (max-width: 1100px){
        h4 {
            font-size: 1.2rem;
        }
        
        p {
            font-size: .9rem;
            margin-bottom: 1.5em;
        }
        
        h3 {
            font-size: 1.2rem;
        }

        a {
            padding: .3rem 1rem .3rem .7rem;
            border-radius: 20px;
            font-size: 1rem;
            gap: 5px;
        }
    }

    @media (orientation: portrait) {
        h4 {
            display: none;
        }
        
        p {
            text-align: center;
            color: var(--content);
            font-size: clamp(1.2rem, 4vw, 1.5rem);
            max-width: 600px;
            line-height: normal;
            margin-bottom: 0;
        }

        h3 {
            display: none;
        }

        .interactives {
            margin-top: 1em;
            justify-content: center;
        }

        a {
            margin-top: .5em;
            font-size: clamp(1.1rem, 4.1vw, 1.3rem);
            padding: .4rem 1rem;
        }

        a ion-icon {
            display: none;
        }

        .share {
            display: none;
        }
    }

</style>