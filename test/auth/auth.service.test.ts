import {User} from "../../src/auth/user";
import type {AuthRepository} from "../../src/auth/auth.repository";
import {AuthService} from "../../src/auth/auth.service";

describe('should call data source', () => {
    let repository: AuthRepository;
    let fakeCurrentUser;
    let fakeSignIn;
    let fakeSignUp;

    beforeEach(() => {
        fakeCurrentUser = jest.fn(() => new User('id'));
        fakeSignIn = jest.fn(() => Promise.resolve(new User(' id')));
        fakeSignUp = jest.fn(() => Promise.resolve(new User(' id')));
        repository = {
            currentUser: fakeCurrentUser,
            signIn: fakeSignIn,
            signUp: fakeSignUp,
        };
    });

    test('Get current user', () => {
        const service = new AuthService(repository);
        service.currentUser();
        expect(fakeCurrentUser.mock.calls.length).toBe(1);
    });

    test('Sign up', async () => {
        const service = new AuthService(repository);
        const user = await service.signUp('mail', 'password');
        expect(user).toBeInstanceOf(User);
        expect(fakeSignUp.mock.calls.length).toBe(1);
        expect(fakeSignUp.mock.calls[0]).toEqual(['mail', 'password']);
    });

    test('Sign in', async () => {
        const service = new AuthService(repository);
        const user = await service.signIn('mail', 'password');
        expect(user).toBeInstanceOf(User);
        expect(fakeSignIn.mock.calls.length).toBe(1);
        expect(fakeSignIn.mock.calls[0]).toEqual(['mail', 'password']);
    });
});
