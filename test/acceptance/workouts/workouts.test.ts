import { AppDsl } from '../dsl/app-dsl';

test('Authenticated user can see his workouts', async () => {
	const app = new AppDsl();

	await app.signIn('toto@gmail.com', 'password1234');

	expect(app.userIsSignedIn('toto@gmail.com')).toBeTruthy();
});
