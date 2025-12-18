"use server";
import { signIn } from "@/lib/auth";

export async function handleProviderLogin() {
  await signIn("", { redirectTo: "/dashboard" });
}
