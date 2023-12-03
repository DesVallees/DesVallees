<script lang="ts">
	import { dictionary } from "../stores";

    const currentYear: number = new Date().getFullYear();
</script>

<div>
    <span>
        {$dictionary.copyright} {currentYear} Santiago Ovalles. 
    </span>
    <span>
        {$dictionary.allRightsReserved}
    </span>
</div>

<style>
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: .8ch;
        
        width: 100%;
        padding: 4rem 2rem 3rem;
    }

    span {
        font-size: 1rem;
        text-align: center;
        text-wrap: balance;
    }

    @media screen and (min-width: 800px) {
        div {
            padding: 3rem 5rem;
        }

        span {
            font-size: 1.1rem;
        }
    }
</style>