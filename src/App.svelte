<main>
	{#if $user.authenticated}
		<WorkoutsPage />
	{:else}
		<AuthPage />
	{/if}
</main>

<script lang='ts'>
	import '../node_modules/svelte-material-ui/bare.css';
	import AuthPage from './auth/AuthPage.svelte';
	import { Externals, Stores, storesKey } from './stores';
	import { setContext } from 'svelte';
	import WorkoutsPage from './workouts/WorkoutsPage.svelte';

	export let externals: Externals;
	let stores = new Stores(externals);
	setContext(storesKey, stores);

	let user = $stores.userStore;

	let email = '';
</script>


<style>
    main {
        @apply flex justify-center items-center h-full;
    }
</style>