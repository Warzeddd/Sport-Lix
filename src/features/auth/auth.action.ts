"use server"

import { signIn, signOut } from "@/auth/auth"

export const SignOutAction = async () => {
    await signOut();
}

export const SignInAction = async () => {
    await signIn();
}