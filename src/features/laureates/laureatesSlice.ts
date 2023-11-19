import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LaureateDTO } from '@/api/dtos/laureate.dto';

interface LaureateState {
  searchText: string;
  laureates: LaureateDTO[];
  total: number;
}

const initialState: LaureateState = {
  searchText: '',
  laureates: [],
  total: 0,
};

export const laureateSlice = createSlice({
  name: 'laureate',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setLaureates: (state, action: PayloadAction<LaureateDTO[]>) => {
      state.laureates = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setSearchText, setLaureates, setTotal } = laureateSlice.actions;

export default laureateSlice.reducer;
