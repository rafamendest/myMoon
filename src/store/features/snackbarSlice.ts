import {createSlice} from '@reduxjs/toolkit';

export interface SnackbarState {
  showSnackbar: boolean;
  message: string;
}

const initialState: SnackbarState = {
    showSnackbar: false,
    message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    snackbarMessage: (state, action) => {
      state.message = action.payload;
    },
    showSnackbar: (state, action) => {
        state.showSnackbar = action.payload;
      },
  },
});

export const {snackbarMessage, showSnackbar} = snackbarSlice.actions;