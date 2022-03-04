import { WorkoutsService } from '../../../src/workouts/workouts.service';
import type { WorkoutsDataSource } from '../../../src/workouts/workouts.data-source';
import type { WorkoutDao } from '../../../src/workouts/workout';
import { Workout, workoutDao } from '../../../src/workouts/workout';
import { WorkoutsRepository } from '../../../src/workouts/workouts.repository';
import { WorkoutsStore } from '../../../src/workouts/workouts.store';

describe('should call data source', () => {
	let fakeGetAllWorkouts: jest.Mock<Promise<WorkoutDao[]>, []>;

	let service: WorkoutsService;

	beforeEach(() => {
		fakeGetAllWorkouts = jest.fn(() => Promise.resolve([workoutDao(42, 'title', new Date())]));
		const dataSource: WorkoutsDataSource = {
			getAllWorkouts: fakeGetAllWorkouts,
		};
		service = new WorkoutsService(new WorkoutsRepository(dataSource));
	});

	test('Get all workouts', async () => {
		const store = new WorkoutsStore(service);
		let workouts: Workout[];
		store.subscribe((w) => (workouts = w));
		await store.getAllWorkouts();
		expect(workouts!!.length).toEqual(1);
	});
});
