import { fireEvent, render } from '@testing-library/svelte';
import App from '../../../src/App.svelte';
import type { AuthDataSource } from '../../../src/auth/auth.data-source';
import { Optional } from '../../../src/utils/optional';
import { UserDao } from '../../../src/auth/user';
import { Externals } from '../../../src/stores';

export class AppProtocolDrivers {
	private readonly authDataSource = new InMemoryAuthDataSource();
	private readonly externals: Externals = new Externals(this.authDataSource);
	private readonly app = render(App, { props: { externals: this.externals } });

	async signUp(email: string, password: string) {
		const emailInput = this.app.getByLabelText('E-mail');
		const passwordInput = this.app.getByLabelText('Password');
		const submitButton = this.app.getByText('SUBMIT');

		await fireEvent.input(emailInput, { target: { value: email } });
		await fireEvent.input(passwordInput, { target: { value: password } });
		await fireEvent.click(submitButton);
	}

	userIsSignedIn(email: string) {
		return email === this.authDataSource.loggedIn;
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
