'use server';
import { signIn, signOut} from "@/myauth";

// export const login = async (redirectPath: string) => {
//     await signIn("google", { redirectTo: redirectPath });
// }
export const login = async () => {
  await signIn("google", { redirectTo: "/" });
}
export const logout = async (redirectPath: string) => {
    await signOut({ redirectTo: redirectPath });
}