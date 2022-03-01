import type { User } from './user';
import type { AuthDataSource } from './auth.data-source';
import { authDataSourceInstance } from './auth.data-source';
import type { Optional } from '../utils/optional';

export interface AuthRepository {
	currentUser(): Optional<User>;

	signIn(email: string, password: string): Promise<Optional<User>>;

	signUp(email: string, password: string): Promise<Optional<User>>;
}

export class AuthRepositoryImpl implements AuthRepository {
	constructor(private readonly authDataSource: AuthDataSource) {}

	currentUser(): Optional<User> {
		return this.authDataSource.currentUser();
	}

	async signIn(email: string, password: string): Promise<Optional<User>> {
		return this.authDataSource.signIn(email, password);
	}

	async signUp(email: string, password: string): Promise<Optional<User>> {
		return this.authDataSource.signUp(email, password);
	}
}

export const authRepositoryInstance = new AuthRepositoryImpl(authDataSourceInstance);
