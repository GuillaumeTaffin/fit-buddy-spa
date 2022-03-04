import type { WorkoutsDataSource } from './workouts.data-source';
import { Workout } from './workout';

export class WorkoutsRepository {
	constructor(private readonly dataSource: WorkoutsDataSource) {}

	async getAllWorkouts(): Promise<Workout[]> {
		return (await this.dataSource.getAllWorkouts()).map(
			(it) => new Workout(it.id, it.title, new Date(it.training_at)),
		);
	}
}
