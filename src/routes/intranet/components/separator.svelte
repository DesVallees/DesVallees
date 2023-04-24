<script lang="ts">
    type Orientation = 'horizontal' | 'vertical'
    export let orientation:Orientation = 'horizontal'
    export let pixels:number = 1
    export let percentage:number = 100
    export let margin:string = "0 0"
    export let color:string = 'var(--content)'
</script>

{#if orientation === 'horizontal'}

    <div style="height: {pixels}px; width: {percentage}%; background-color: {color}; margin: {margin};"></div>
    
    {:else}

    <div style="width: {pixels}px; height: {percentage}; background-color: {color}; margin: {margin};"></div>
    
{/if}