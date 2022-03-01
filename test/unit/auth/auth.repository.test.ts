import { UserDao } from '../../../src/auth/user';
import type { AuthDataSource } from '../../../src/auth/auth.data-source';
import { AuthRepositoryImpl } from '../../../src/auth/auth.repository';

describe('should call data source', () => {
	let dataSource: AuthDataSource;
	let fakeCurrentUser: jest.Mock;
	let fakeSignIn: jest.Mock;
	let fakeSignUp: jest.Mock;

	beforeEach(() => {
		fakeCurrentUser = jest.fn(() => new UserDao('id'));
		fakeSignIn = jest.fn(() => Promise.resolve(new UserDao(' id')));
		fakeSignUp = jest.fn(() => Promise.resolve(new UserDao(' id')));
		dataSource = {
			currentUser: fakeCurrentUser,
			signIn: fakeSignIn,
			signUp: fakeSignUp,
		};
	});

	test('Get current user', () => {
		const repository = new AuthRepositoryImpl(dataSource);
		repository.currentUser();
		expect(fakeCurrentUser.mock.calls.length).toBe(1);
	});

	test('Sign up', async () => {
		const repository = new AuthRepositoryImpl(dataSource);
		const user = await repository.signUp('mail', 'password');
		expect(user).toBeDefined();
		expect(fakeSignUp.mock.calls.length).toBe(1);
		expect(fakeSignUp.mock.calls[0]).toEqual(['mail', 'password']);
	});

	test('Sign in', async () => {
		const repository = new AuthRepositoryImpl(dataSource);
		const user = await repository.signIn('mail', 'password');
		expect(user).toBeDefined();
		expect(fakeSignIn.mock.calls.length).toBe(1);
		expect(fakeSignIn.mock.calls[0]).toEqual(['mail', 'password']);
	});
});
