import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeditationTip } from './meditationSlice';

export interface FavouritesState {
  items: MeditationTip[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<MeditationTip>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFavourites: (state, action: PayloadAction<MeditationTip[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavourite, removeFavourite, setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
