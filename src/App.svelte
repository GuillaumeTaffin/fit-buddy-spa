<script lang="ts">
    import "../node_modules/svelte-material-ui/bare.css";
    import Button from '@smui/button';

    export let name;

    let clicked = false;
</script>

<main>
    {#if clicked}
        <h1>Hello {name}!</h1>
    {/if}
    <Button on:click={() => clicked = true}>ADD</Button>

</main>
