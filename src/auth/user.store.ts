import type {Subscriber, Unsubscriber, Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import type {UserViewModel} from "./user";
import type {AuthService} from "./auth.service";
import {authServiceInstance} from "./auth.service";

export class UserStore {
    private readonly user: Writable<UserViewModel>;

    constructor(private readonly authService: AuthService) {
        this.user = writable(authService.currentUser());
    }

    w;

    subscribe(run: Subscriber<UserViewModel>): Unsubscriber {
        return this.user.subscribe(run);
    }

    async signIn(email: string, password: string): Promise<void> {
        this.user.set(await this.authService.signIn(email, password));
    }

    async signUp(email: string, password: string): Promise<void> {
        this.user.set(await this.authService.signUp(email, password));
    }
}

export const userStore = new UserStore(authServiceInstance);
