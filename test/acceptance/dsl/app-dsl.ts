import { AppProtocolDrivers } from './app-protocol-drivers';
import type { WorkoutDsl } from './models/workout';

export class AppDsl {
	constructor(
		private readonly initAppState: InitAppState = new InitAppState(),
		private readonly drivers = new AppProtocolDrivers(initAppState),
	) {}

	async signIn(email: string, password: string) {
		await this.drivers.signIn(email, password);
	}

	userIsSignedIn(email: string): boolean {
		return this.drivers.userIsSignedIn(email);
	}

	async goToWorkouts() {
		await this.drivers.goToWorkouts();
	}

	async visibleWorkouts(savedWorkouts: WorkoutDsl[]): Promise<boolean> {
		return await this.drivers.visibleWorkouts(savedWorkouts);
	}
}

export class InitAppState {
	constructor(readonly savedWorkouts: WorkoutDsl[] = []) {}
}
