<script lang="ts">

    export let name : string;
    export let category : string;
    
</script>

<div>
    <h3>{category}</h3>
    <h1>{name}</h1>
</div>

<style>

    div {
        display: grid;
    }
    
    h3{
        color: var(--interactive);
        font-size: 1.5rem;
        text-transform: uppercase;
    }
    
    h1 {
        font-size: 4rem;
        font-weight: lighter;
        text-transform: uppercase;
        line-height: 4.8rem;
    }

    @media screen and (max-width: 1100px){
        h3{
            font-size: 1.3rem;
        }
        
        h1 {
            font-size: 3.5rem;
            line-height: 4rem;
        }
    }

    @media (orientation: portrait) {
        h3{
            font-size: clamp(1rem, 4vw, 1.4rem);
        }
        
        h1 {
            font-size: clamp(1.5rem, 7vw, 3.2rem);
            line-height: normal;
        }
    }

</style>