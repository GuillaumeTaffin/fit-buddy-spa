import type { Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { User } from './user';
import { UserViewModel } from './user';
import type { AuthService } from './auth.service';
import { authServiceInstance } from './auth.service';
import type { Optional } from '../utils/optional';

export class UserStore {
	private readonly user: Writable<UserViewModel>;

	constructor(private readonly authService: AuthService) {
		this.user = writable(this.toViewModel(authService.currentUser()));
	}

	subscribe(run: Subscriber<UserViewModel>): Unsubscriber {
		return this.user.subscribe(run);
	}

	async signIn(email: string, password: string): Promise<void> {
		this.user.set(this.toViewModel(await this.authService.signIn(email, password)));
	}

	async signUp(email: string, password: string): Promise<void> {
		this.user.set(this.toViewModel(await this.authService.signUp(email, password)));
	}

	private toViewModel(optional: Optional<User>): UserViewModel {
		return optional
			.map((u: User) => new UserViewModel(true, u.id))
			.orElse(() => new UserViewModel(false, ''));
	}
}

export const userStore = new UserStore(authServiceInstance);
