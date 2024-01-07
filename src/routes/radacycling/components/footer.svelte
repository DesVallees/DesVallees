<script lang="ts">
	import { dictionary } from "../stores";

    const currentYear: number = new Date().getFullYear();
</script>

<section>
    <div>
        <a href="https://www.instagram.com/rada_cyclingwear/" target="_blank" class="baseButton" aria-label="Instagram">
            <ion-icon name="logo-instagram"></ion-icon>
            <span>Instagram</span> 
        </a>
        <a href="https://www.facebook.com/rada.cyclingwear/" target="_blank" class="baseButton" aria-label="Facebook">
            <ion-icon name="logo-facebook"></ion-icon>
            <span>Facebook</span> 
        </a>
    </div>
</section>

<footer>
    <span>
        {$dictionary.copyright} {currentYear} RadaCycling. 
    </span>
    <span>
        {$dictionary.allRightsReserved}
    </span>
</footer>

<style>
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 1ch;
        row-gap: .5rem;
    }

    section {
        max-width: 1500px;
        margin: auto;
        display: grid;
        row-gap: .5rem;
        
        padding: 2rem 4rem;
    }

    footer {
        width: fit-content;
        max-width: 1500px;
        margin: auto;

        text-align: center;
        text-wrap: balance;
        
        padding: 1rem 4rem 3rem;
    }
    
    a {
        text-align: center;
        text-wrap: balance;
        font-size: 1.05rem;
    }

    span {
        font-size: 1rem;
        text-align: center;
        text-wrap: balance;
    }

    @media screen and (min-width: 800px) {
        span {
            font-size: 1.05rem;
        }
    }

    @media screen and (max-width: 600px) {
        section {
            row-gap: 1.5rem;
        }
        
        a span {
            display: none;
        }
    }
</style>