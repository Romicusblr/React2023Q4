import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LaureateState {
  searchText: string;
  perPage: number;
}

const initialState: LaureateState = {
  searchText: '',
  perPage: 0,
};

export const laureateSlice = createSlice({
  name: 'laureate',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
});

export const { setSearchText, setPerPage } = laureateSlice.actions;

export default laureateSlice.reducer;
