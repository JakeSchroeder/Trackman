import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import playlistReducer from "../playlist/playlistSlice";
import { logger } from "redux-logger";
import playerSlice from "../player/playerSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
