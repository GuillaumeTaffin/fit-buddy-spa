import { UserDao } from './user';
import { supabase } from '../backend/supabase';
import type { User } from '@supabase/supabase-js';
import { Optional } from '../utils/optional';

export interface AuthDataSource {
	currentUser(): Optional<UserDao>;

	signIn(email: string, password: string): Promise<Optional<UserDao>>;

	signUp(email: string, password: string): Promise<Optional<UserDao>>;
}

export class AuthDataSourceSupabase implements AuthDataSource {
	async signIn(email: string, password: string): Promise<Optional<UserDao>> {
		const info = await supabase.auth.signIn({ email: email, password: password });
		return this.toOptionalDao(info.user);
	}

	async signUp(email: string, password: string): Promise<Optional<UserDao>> {
		const info = await supabase.auth.signUp({ email: email, password: password });
		return this.toOptionalDao(info.user);
	}

	currentUser(): Optional<UserDao> {
		return this.toOptionalDao(supabase.auth.user());
	}

	private toOptionalDao(user: User | null) {
		return Optional.of(user).map((user) => new UserDao(user.id));
	}
}

export const authDataSourceInstance = new AuthDataSourceSupabase();
