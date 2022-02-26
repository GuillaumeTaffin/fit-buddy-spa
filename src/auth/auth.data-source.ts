import {UserDao} from "./user";
import {supabase} from "../backend/supabase";

export interface AuthDataSource {
    currentUser(): UserDao;

    signIn(email: string, password: string): Promise<UserDao>;

    signUp(email: string, password: string): Promise<UserDao>;
}

class AuthDataSourceSupabase implements AuthDataSource {

    async signIn(email: string, password: string): Promise<UserDao> {
        const info = await supabase.auth.signIn({email: email, password: password});
        return new UserDao(info.user.id);
    }

    async signUp(email: string, password: string): Promise<UserDao> {
        const info = await supabase.auth.signUp({email: email, password: password});
        return new UserDao(info.user.id);
    }

    currentUser(): UserDao {
        return supabase.auth.user() ? new UserDao(supabase.auth.user().id) : undefined;
    }
}

export const authDataSourceInstance = new AuthDataSourceSupabase();
