import type { WorkoutsRepository } from './workouts.repository';
import type { Workout } from './workout';

export class WorkoutsService {
	constructor(private readonly repository: WorkoutsRepository) {}

	async getAllWorkouts(): Promise<Workout[]> {
		return await this.repository.getAllWorkouts();
	}
}
