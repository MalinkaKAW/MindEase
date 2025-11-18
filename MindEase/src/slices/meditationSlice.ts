import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MeditationTip {
  id: string;
  quote: string;
  author?: string;
  category?: string;
  level?: string;
  icon?: string;
}

export interface MeditationState {
  tips: MeditationTip[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MeditationState = {
  tips: [],
  isLoading: false,
  error: null,
};

const meditationSlice = createSlice({
  name: 'meditation',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTips: (state, action: PayloadAction<MeditationTip[]>) => {
      state.tips = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setTips, setError } = meditationSlice.actions;
export default meditationSlice.reducer;
