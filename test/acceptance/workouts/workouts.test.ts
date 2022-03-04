import { AppDsl } from '../dsl/app-dsl';
import { WorkoutDsl } from '../dsl/models/workout';

test('Authenticated user can see his workouts', async () => {
	const savedWorkouts = [new WorkoutDsl(0, 'w1'), new WorkoutDsl(1, 'w2')];
	const app = new AppDsl({ savedWorkouts });

	await app.signIn('toto@gmail.com', 'password1234');
	await app.goToWorkouts();

	expect(await app.visibleWorkouts(savedWorkouts)).toBeTruthy();
});
