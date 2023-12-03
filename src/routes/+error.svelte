<script lang="ts">
    import './app.css'
</script>

<div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <a href="/">Go to Homepage</a>
</div>

<style>
    div {
        display: grid;
        justify-items: center;

        margin-top: 5rem;
    }

    h1 {
        font-size: 5rem;
    }

    h2 {
        font-size: 1.25rem;
    }
    
    a {
        padding: .325em .75em;
        margin-top: 2rem;
        border-radius: 10px;
    
        font-weight: 700;
        font-size: 1.1rem;
        white-space: nowrap;
        text-decoration: none;
    
        transition: .2s all;
        border: 1px solid var(--interactive);
        background-color: var(--interactive-7);
        color: inherit;
    }

    a:hover,
    a:focus-visible {
        background-color: var(--interactive);
    }
</style>