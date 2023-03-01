<script lang="ts">
    export let content:string;
</script>

<span>{content}</span>

<style>

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 1.5rem;
        font-family: inherit;
        color: var(--fg-200);

        animation: caret infinite 3s;
    }

    @keyframes caret {
        0%, 100% {opacity: 0.5;}
        50% {opacity: 1;}
    }

</style>