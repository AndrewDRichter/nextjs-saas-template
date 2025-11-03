'use server';
import { signIn } from '@/lib/auth';

export async function handleProviderLogin(provider: string) {
    await signIn(provider, { redirectTo: '/dashboard' });
}