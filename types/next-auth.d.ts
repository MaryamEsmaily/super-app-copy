import { DefaultUser } from 'next-auth';

type DXUser = DefaultUser & {
  accessToken: string;
  refreshToken: string;
  id: string;
};
declare module 'next-auth' {
  interface User extends DXUser {}
  interface Session {
    user?: DXUser;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends DXUser {}
}
