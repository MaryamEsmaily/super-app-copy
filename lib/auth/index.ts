import { authConfig } from '@/auth.config';
import nextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = nextAuth({
  ...authConfig,
  providers: [
    credentials({
      name: 'credentials',
      authorize({ id, accessToken, refreshToken }) {
        if (typeof id === 'string') {
          const user: User = { id, accessToken, refreshToken };
          if (user.accessToken) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
