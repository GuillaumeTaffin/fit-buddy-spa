import { AppProtocolDrivers } from './app-protocol-drivers';

export class AppDsl {
	constructor(private readonly drivers = new AppProtocolDrivers()) {}

	async signUp(email: string, password: string) {
		await this.drivers.signUp(email, password);
	}

	userIsSignedIn(email: string): boolean {
		return this.drivers.userIsSignedIn(email);
	}
}
