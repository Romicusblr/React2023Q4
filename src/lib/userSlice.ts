import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTOC: boolean;
  picture: string;
  country: string;
}

export interface UserState {
  controlled: Partial<User>;
  uncontrolled: Partial<User>;
}

const initialState: UserState = {
  controlled: {},
  uncontrolled: {},
};

export const laureateSlice = createSlice({
  name: "laureate",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.controlled = action.payload;
    },
  },
});

export const { setUser } = laureateSlice.actions;

export default laureateSlice.reducer;
