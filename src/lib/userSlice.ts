import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./dtos/User";

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
    setControlledUser: (state, action: PayloadAction<User>) => {
      state.controlled = action.payload;
    },
    setUncontrolledUser: (state, action: PayloadAction<User>) => {
      state.uncontrolled = action.payload;
    },
  },
});

export const { setControlledUser, setUncontrolledUser } = laureateSlice.actions;

export default laureateSlice.reducer;
