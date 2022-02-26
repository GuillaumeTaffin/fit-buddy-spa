import {UserDao, UserViewModel} from "../../src/auth/user";
import {AuthRepositoryImpl} from "../../src/auth/auth.repository";
import {AuthService} from "../../src/auth/auth.service";
import {UserStore} from "../../src/auth/user.store";
import type {AuthDataSource} from "../../src/auth/auth.data-source";

describe('should call data source', () => {
    let fakeCurrentUser;
    let fakeSignIn;
    let fakeSignUp;

    let authService;

    const credentialsToId = (email: string, password: string) =>
        Promise.resolve(new UserDao(`${email} - ${password}`));

    beforeEach(() => {
        fakeCurrentUser = jest.fn(() => new UserDao('id'));
        fakeSignIn = jest.fn(credentialsToId);
        fakeSignUp = jest.fn(credentialsToId);
        const dataSource: AuthDataSource = {
            currentUser: fakeCurrentUser,
            signIn: fakeSignIn,
            signUp: fakeSignUp,
        };
        authService = new AuthService(new AuthRepositoryImpl(dataSource));
    });

    test('Get current user', () => {
        const store = new UserStore(authService);
        let initialUser;
        store.subscribe((user) => (initialUser = user));
        expect(initialUser).toBeDefined();
        expect(fakeCurrentUser.mock.calls.length).toBe(1);
    });

    test('Sign up', async () => {
        const store = new UserStore(authService);
        let user: UserViewModel;
        store.subscribe((u) => (user = u));
        await store.signUp('mail', 'password');
        expect(user.id).toEqual('mail - password');
    });

    test('Sign in', async () => {
        const store = new UserStore(authService);
        let user: UserViewModel;
        store.subscribe((u) => (user = u));
        await store.signIn('mail', 'password');
        expect(user.id).toEqual('mail - password');
    });
});
