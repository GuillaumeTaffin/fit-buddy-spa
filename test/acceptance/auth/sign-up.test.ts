import { AppDsl } from '../dsl/app-dsl';

test('New user can sign up with valid credentials', async () => {
	const app = new AppDsl();

	await app.signUp('toto@gmail.com', 'password1234');

	expect(app.userIsSignedIn('toto@gmail.com')).toBeTruthy();
});
