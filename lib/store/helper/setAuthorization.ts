import { getSession } from 'next-auth/react';

const setAuthorization = async (headers: Headers) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    headers.set('Authorization', session.user.accessToken);
  }
  return headers;
};

export default setAuthorization;
