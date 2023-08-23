<script lang="ts">
	import { dictionary } from "../stores";
</script>

<div>

</div>

<style>
    div {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid var(--content);
        position: sticky;
        top: 0;
        background-color: var(--mainDimer);
        z-index: 2;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }
</style>