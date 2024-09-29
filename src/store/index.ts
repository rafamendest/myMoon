import {configureStore} from '@reduxjs/toolkit';
import {snackbarSlice} from './features';

/**
 * The Redux store.
 */
export const store = configureStore({
  reducer: {
    // Add reducers here
    snackbar: snackbarSlice.reducer,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// In order to use dispatch in the App component, we need to export the AppDispatch type
export type AppDispatch = typeof store.dispatch;