import type {User} from "./user";
import type {AuthDataSource} from "./auth.data-source";
import {authDataSourceInstance} from "./auth.data-source";

export interface AuthRepository {
    currentUser(): User;

    signIn(email: string, password: string): Promise<User>;

    signUp(email: string, password: string): Promise<User>;
}

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDataSource: AuthDataSource) {
    }

    currentUser(): User {
        return this.authDataSource.currentUser();
    }

    async signIn(email: string, password: string): Promise<User> {
        return this.authDataSource.signIn(email, password);
    }

    async signUp(email: string, password: string): Promise<User> {
        return this.authDataSource.signUp(email, password);
    }
}

export const authRepositoryInstance = new AuthRepositoryImpl(authDataSourceInstance);
