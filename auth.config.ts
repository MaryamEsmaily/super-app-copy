import { NextAuthConfig } from 'next-auth';
import ROUTES from './lib/static/routes';

export const authConfig = {
  pages: {
    signIn: ROUTES.auth,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith(ROUTES.home);
      if (isOnHome) {
        return isLoggedIn; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(ROUTES.home, nextUrl));
      }
      return true;
    },
  },
  // TODO comment on production ready
  trustHost: true,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
