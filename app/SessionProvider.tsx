'use client';
import { ReactNode } from 'react';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';

const SessionProvider = ({ children }: { children: ReactNode }) => (
  <AuthSessionProvider>{children}</AuthSessionProvider>
);
export default SessionProvider;
