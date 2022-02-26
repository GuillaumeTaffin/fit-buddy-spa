import type {AuthRepository} from "./auth.repository";
import {authRepositoryInstance} from "./auth.repository";
import type {User} from "./user";

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {
    }

    async signIn(email: string, password: string) {
        return this.authRepository.signIn(email, password);
    }

    currentUser(): User {
        return this.authRepository.currentUser();
    }

    async signUp(email: string, password: string): Promise<User> {
        return this.authRepository.signUp(email, password);
    }
}

export const authServiceInstance = new AuthService(authRepositoryInstance);
