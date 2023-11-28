<script lang="ts">
	import ChangeLanguage from "./changeLanguage.svelte";
	import Logo from "./logo.svelte";


</script>

<div>
    <Logo />
    <ChangeLanguage />
</div>

<style>

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 3rem;

        padding: .8rem 2rem;
    }

    @media screen and (min-width: 650px) {
        div {
            padding: 1rem 3rem;
        }
    }

</style>