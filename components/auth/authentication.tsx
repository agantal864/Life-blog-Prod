'use server';
import { signIn, signOut} from "@/myauth";

export const login = async (redirectPath: string) => {
    await signIn("google");
}

export const logout = async (redirectPath: string) => {
    await signOut({ redirectTo: redirectPath });
}