import { fireEvent, render } from '@testing-library/svelte';
import App from '../../../src/App.svelte';
import type { AuthDataSource } from '../../../src/auth/auth.data-source';
import { Optional } from '../../../src/utils/optional';
import { UserDao } from '../../../src/auth/user';
import { Externals } from '../../../src/stores';
import type { WorkoutsDataSource } from '../../../src/workouts/workouts.data-source';
import type { WorkoutDao } from '../../../src/workouts/workout';
import { workoutDao } from '../../../src/workouts/workout';
import type { InitAppState } from './app-dsl';
import type { WorkoutDsl } from './models/workout';

export class AppProtocolDrivers {
	private readonly authDataSource: InMemoryAuthDataSource;
	private readonly workoutsDataSource: InMemoryWorkoutsDataSource;
	private readonly externals: Externals;
	private readonly app;

	constructor(private readonly initAppState: InitAppState) {
		this.authDataSource = new InMemoryAuthDataSource();
		this.workoutsDataSource = new InMemoryWorkoutsDataSource(initAppState.savedWorkouts);
		this.externals = new Externals(this.authDataSource, this.workoutsDataSource);
		this.app = render(App, { props: { externals: this.externals } });
	}

	async signIn(email: string, password: string) {
		const emailInput = this.app.getByLabelText('E-mail');
		const passwordInput = this.app.getByLabelText('Password');
		const submitButton = this.app.getByText('SUBMIT');

		await fireEvent.input(emailInput, { target: { value: email } });
		await fireEvent.input(passwordInput, { target: { value: password } });
		await fireEvent.click(submitButton);
	}

	async goToWorkouts() {}

	userIsSignedIn(email: string) {
		return email === this.authDataSource.loggedIn;
	}

	async visibleWorkouts(workouts: WorkoutDsl[]): Promise<boolean> {
		for (let workout of workouts) {
			await this.app.getByText(workout.title);
		}
		return true;
	}
}

class InMemoryAuthDataSource implements AuthDataSource {
	loggedIn: string = '';

	currentUser(): Optional<UserDao> {
		return Optional.empty();
	}

	signIn(email: string, password: string): Promise<Optional<UserDao>> {
		this.loggedIn = email;
		return Promise.resolve(Optional.of(new UserDao('id')));
	}

	signUp(email: string, password: string): Promise<Optional<UserDao>> {
		return Promise.resolve(Optional.of(new UserDao('id')));
	}
}

class InMemoryWorkoutsDataSource implements WorkoutsDataSource {
	constructor(private readonly savedWorkouts: WorkoutDsl[]) {}

	getAllWorkouts(): Promise<WorkoutDao[]> {
		return Promise.resolve(
			this.savedWorkouts.map((it) => workoutDao(it.id, it.title, it.trainingAt)),
		);
	}
}
