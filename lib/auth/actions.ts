'use server';
import { signIn, signOut } from '@/lib/auth/index';
import { AuthError } from 'next-auth';

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};

export const exit = async () => {
  try {
    await signOut();
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message;
    }
    throw error;
  }
};
