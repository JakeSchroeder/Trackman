import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import trackList from "../../data/tracks";
import { RootState } from "../app/store";
import { Playlist, Track } from "./types";

export interface PlaylistState {
  allTracks: Track[];
  selectedTrack: Track;
}

const initialState: PlaylistState = {
  allTracks: trackList, //static data for now will be fetched
  // allPlaylists: [
  //   {
  //     id: nanoid(),
  //     title: "All Songs",
  //     description: "This is a playlist for all your songs!",
  //     artworkPath: "./assets/images/album-cover.jpg",
  //   } as Playlist,
  // ],
  selectedTrack: trackList[0],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setTrackToPlay: (state, action: PayloadAction<Track>) => {
      state.selectedTrack = action.payload;
    },
    playPrevTrack: (state) => {
      for (let i = 0; i < state.allTracks.length; i++) {
        if (state.allTracks[i].id === state.selectedTrack.id) {
          if (state.allTracks[i - 1]) {
            state.selectedTrack = state.allTracks[i - 1];
          } else {
            state.selectedTrack = state.allTracks[state.allTracks.length - 1];
          }
          return;
        }
      }
    },
    playNextTrack: (state) => {
      for (let i = 0; i < state.allTracks.length; i++) {
        if (state.allTracks[i].id === state.selectedTrack.id) {
          if (state.allTracks[i + 1]) {
            state.selectedTrack = state.allTracks[i + 1];
          } else {
            state.selectedTrack = state.allTracks[0];
          }
          return;
        }
      }
    },
    addTracks: (state, action: PayloadAction<Track[]>) => {
      state.allTracks = [...state.allTracks, ...action.payload];
    },
    // addTrack: (state, action: PayloadAction<Track>) => {
    //   state.allTracks.push(action.payload);
    // },
    // setActive: ()
    // addTrack: {
    //   reducer: (state, action: PayloadAction<Track>) => {
    //     state.allTracks.push(action.payload);
    //   },
    //   prepare: (track: Track) => {
    //     const id = nanoid();
    //     return { payload: { ...track} };
    //   },
    // },
  },
  extraReducers: {},
});

export const { setTrackToPlay, playPrevTrack, playNextTrack, addTracks } = playlistSlice.actions;

// export const selectAllPlaylists = (state: RootState) => state.playlist.allPlaylists;
export const selectAllTracks = (state: RootState) => state.playlist.allTracks;
export const selectSelectedTrack = (state: RootState) => state.playlist.selectedTrack;

export default playlistSlice.reducer;
