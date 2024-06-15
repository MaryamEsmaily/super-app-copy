import { exit } from '@/lib/auth/actions';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import setAuthorization from './setAuthorization';

const unAuthorized = 401;

type CustomBaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

/* Custom base query function */
const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => setAuthorization(headers),
});

/* Intercept errors and handle logout for 401 status */
const customBaseQuery: CustomBaseQueryFn = async (args, api, extraOptions) => {
  const result = await customFetchBaseQuery(args, api, extraOptions);
  if (result.error?.status === unAuthorized) {
    await exit();
  }
  return result;
};

export default customBaseQuery;
