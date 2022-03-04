export class Workout {
	constructor(
		public readonly id: number,
		public readonly title: string,
		public readonly trainingAt: Date,
	) {}
}

export type WorkoutDao = {
	id: number;
	title: string;
	training_at: string;
};

export function workoutDao(id: number, title: string, training_at: Date): WorkoutDao {
	return {
		id,
		title,
		training_at: training_at.toLocaleString(),
	};
}
