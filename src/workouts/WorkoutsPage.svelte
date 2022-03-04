<script lang='ts'>
	import PageBase from '../components/PageBase.svelte';
	import { Stores, storesKey } from '../stores';
	import { getContext } from 'svelte';

	let stores: Stores = getContext(storesKey);
	let workoutsStore = $stores.workoutsStore;
	workoutsStore.getAllWorkouts();
</script>

<PageBase>
	<h1>WORKOUTS</h1>
	{#each $workoutsStore as workout (workout.id)}
		<p>{workout.title}</p>
		<p>{workout.trainingAt}</p>
	{/each}
</PageBase>