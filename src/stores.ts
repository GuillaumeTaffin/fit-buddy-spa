import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { UserStore } from './auth/user.store';
import type { AuthDataSource } from './auth/auth.data-source';
import { AuthDataSourceSupabase } from './auth/auth.data-source';
import { AuthService } from './auth/auth.service';
import { AuthRepositoryImpl } from './auth/auth.repository';
import type { Subscriber, Unsubscriber } from 'svelte/types/runtime/store';
import { WorkoutsStore } from './workouts/workouts.store';
import type { WorkoutsDataSource } from './workouts/workouts.data-source';
import { WorkoutsSupabase } from './workouts/workouts.data-source';
import { WorkoutsService } from './workouts/workouts.service';
import { WorkoutsRepository } from './workouts/workouts.repository';

export class Stores {
	private readonly stores: Writable<AllStores>;

	constructor(externals: Externals) {
		this.stores = writable({
			userStore: new UserStore(
				new AuthService(new AuthRepositoryImpl(externals.authDataSource)),
			),
			workoutsStore: new WorkoutsStore(
				new WorkoutsService(new WorkoutsRepository(externals.workoutsDataSource)),
			),
		});
	}

	subscribe(run: Subscriber<AllStores>): Unsubscriber {
		return this.stores.subscribe(run);
	}
}

export const storesKey = Symbol();

export class Externals {
	constructor(
		readonly authDataSource: AuthDataSource,
		readonly workoutsDataSource: WorkoutsDataSource,
	) {}
}

export const defaultExternals: Externals = new Externals(
	new AuthDataSourceSupabase(),
	new WorkoutsSupabase(),
);

interface AllStores {
	userStore: UserStore;
	workoutsStore: WorkoutsStore;
}
