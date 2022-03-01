import type { AuthRepository } from './auth.repository';
import { authRepositoryInstance } from './auth.repository';
import type { User } from './user';
import type { Optional } from '../utils/optional';

export class AuthService {
	constructor(private readonly authRepository: AuthRepository) {}

	async signIn(email: string, password: string): Promise<Optional<User>> {
		return this.authRepository.signIn(email, password);
	}

	currentUser(): Optional<User> {
		return this.authRepository.currentUser();
	}

	async signUp(email: string, password: string): Promise<Optional<User>> {
		return this.authRepository.signUp(email, password);
	}
}

export const authServiceInstance = new AuthService(authRepositoryInstance);
