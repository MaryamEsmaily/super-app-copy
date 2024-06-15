import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './helper/customBaseQuery';

/* Initialize an empty api service that we'll inject endpoints into later as needed */
export const baseFlexApi = createApi({
  reducerPath: 'baseFlexApi',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
