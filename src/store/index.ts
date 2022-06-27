import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import api from './middlewares/api';

import rootReducer, { RootState } from './slice';

const devMode = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootState>(), api],
  devTools: devMode,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

//makeStore function that returns a new store for every request
export const makeStore = () => store;
