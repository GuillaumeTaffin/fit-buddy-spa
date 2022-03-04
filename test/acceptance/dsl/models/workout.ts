import { Workout } from '../../../../src/workouts/workout';

export class WorkoutDsl extends Workout {
	constructor(id: number, title: string) {
		super(id, title, new Date());
	}
}
