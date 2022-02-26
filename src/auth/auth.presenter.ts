import type {Subscriber, Unsubscriber, Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import {userStore} from "./user.store";

export class AuthPresenter {
    private readonly state: Writable<AuthPageState>;
    private readonly signUpState: AuthPageState;
    private readonly signInState: AuthPageState;

    constructor() {
        this.signInState = {
            isSignUp: false,
            switchContextMessage: 'Not a member ?',
            switchContextButtonText: 'Sign Up',
        };

        this.signUpState = {
            isSignUp: true,
            switchContextMessage: 'Already member ?',
            switchContextButtonText: 'Sign In',
        };

        this.state = writable(this.signInState);
    }

    subscribe(run: Subscriber<AuthPageState>): Unsubscriber {
        return this.state.subscribe(run);
    }

    switchContext = () =>
        this.state.update((previous) => (previous.isSignUp ? this.signInState : this.signUpState));

    submit(email: string, password: string, confirmPassword: string) {
        userStore.signIn(email, password);
    }
}

interface AuthPageState {
    isSignUp: boolean;
    switchContextMessage: string;
    switchContextButtonText: string;
}
