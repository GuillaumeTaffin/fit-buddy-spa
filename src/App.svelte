<main>
    <div class="toto">
        {#if $user}
            <Textfield class="p-8" variant='outlined' bind:value={email} label='E-mail'/>
        {:else}
            <AuthPage/>
        {/if}
    </div>
</main>

<script lang="ts">
    import "../node_modules/svelte-material-ui/bare.css";
    import AuthPage from "./auth/AuthPage.svelte";
    import {userStore} from "./auth/user.store";
    import Textfield from '@smui/textfield';

    let user = userStore;

    let email = '';
</script>


<style>
    main {
        @apply flex justify-center items-center h-full;
    }

    .toto {
        @apply w-full max-w-xl;
        @apply h-full;
    }
</style>