import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface PlayerState {
  isPlaying: boolean;
}

const initialState: PlayerState = {
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
  extraReducers: {},
});

export const { setIsPlaying } = playerSlice.actions;

export const selectIsPlaying = (state: RootState) => state.player.isPlaying;

export default playerSlice.reducer;
