'use server';
import { signIn, signOut} from "@/auth";

export const login = async (redirectPath: string) => {
    await signIn("google", { redirectTo: redirectPath });
}
export const logout = async (redirectPath: string) => {
    await signOut({ redirectTo: redirectPath });
}