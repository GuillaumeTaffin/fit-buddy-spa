<script lang='ts'>
	import PageBase from '../components/PageBase.svelte';
	import { Stores, storesKey } from '../stores';
	import { getContext } from 'svelte';
	import Button, { Icon, Label } from '@smui/button';

	let stores: Stores = getContext(storesKey);
	let workoutsStore = $stores.workoutsStore;
	workoutsStore.getAllWorkouts();

	$: workouts = $workoutsStore.map(it => {
		return { title: it.title, date: it.trainingAt.toDateString() };
	});
</script>

<PageBase>
	<div class='wrapper'>
		<div class='header'>
			<h1 class='title'>WORKOUTS</h1>
		</div>
		<div class='body'>
			<div class='action-bar'>
				<Button variant='outlined' ripple={false} class='add-button'>
					<Icon class='material-icons'>add</Icon>
					<Label>new workout</Label>
				</Button>
			</div>
			<div class='content'>
				{#each workouts as workout (workout.id)}
					<div class='card-container'>
						<p class='card-title'>{workout.title}</p>
						<p class='card-subtitle'>{workout.date}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>


</PageBase>

<style>
    .wrapper {
        @apply h-full flex flex-col;
    }

    .header {
        @apply p-4;
    }

    .title {
        @apply text-xl font-bold tracking-wider;
    }

    .body {
        @apply flex-grow;
        @apply flex flex-col-reverse md:flex-row;
    }

    .action-bar {
        @apply p-4 flex flex-col items-center;
    }

    * :global(.add-button) {
        @apply flex justify-evenly rounded-full bg-transparent w-fit;
        font-style: italic;
    }

    .content {
        @apply p-4 flex-grow;
    }

    .card-container {
        @apply border border-solid border-gray-200 rounded-md py-2 px-4;
        @apply flex flex-wrap items-center justify-between;
    }

    .card-title {
        @apply text-lg font-bold tracking-wide;
    }

    .card-subtitle {
        @apply text-sm text-gray-500;
    }
</style>