import { configureStore } from '@reduxjs/toolkit';
import { FlexApi } from './FlexApi';
import auth from '@/app/auth/slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
      [FlexApi.reducerPath]: FlexApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(FlexApi.middleware),
  });
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
