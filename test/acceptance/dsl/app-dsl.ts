import { AppProtocolDrivers } from './app-protocol-drivers';

export class AppDsl {
	constructor(private readonly drivers = new AppProtocolDrivers()) {}

	async signIn(email: string, password: string) {
		await this.drivers.signIn(email, password);
	}

	userIsSignedIn(email: string): boolean {
		return this.drivers.userIsSignedIn(email);
	}
}
