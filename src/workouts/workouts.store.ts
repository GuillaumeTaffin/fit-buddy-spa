import type { WorkoutsService } from './workouts.service';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Subscriber, Unsubscriber } from 'svelte/types/runtime/store';
import type { Workout } from './workout';

export class WorkoutsStore {
	private readonly state: Writable<Workout[]>;

	constructor(private readonly service: WorkoutsService) {
		this.state = writable([]);
	}

	subscribe(run: Subscriber<Workout[]>): Unsubscriber {
		return this.state.subscribe(run);
	}

	async getAllWorkouts(): Promise<void> {
		const workouts = await this.service.getAllWorkouts();
		this.state.set(workouts);
	}
}
