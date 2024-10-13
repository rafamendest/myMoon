import {createSlice} from '@reduxjs/toolkit';

export interface SnackbarState {
  userUid: string;
}

const initialState: SnackbarState = {
    userUid: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state, action) => {
      state.userUid = action.payload;
    },
  },
});

export const {setUserUid} = userSlice.actions;