<script lang="ts">
	import ChangeLanguage from "./changeLanguage.svelte";
	import Logo from "./logo.svelte";


</script>

<nav class="primaryNav">
    <a class="logo" href="/intranet">
        <Logo />
    </a>

    <ChangeLanguage />
</nav>

<style>
    
    .primaryNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        height: fit-content;
        margin-bottom: 20px;
        position: sticky;
        top: 0;
        z-index: 10;
        padding: 20px 10vw;
        width: 100%;

        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .logo {
        transform: scale(.8) translateX(-20%);
    }

</style>