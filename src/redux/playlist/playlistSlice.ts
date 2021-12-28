import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import trackList from "../../data/tracks";
import { RootState } from "../app/store";

type Track = {
  id: string;
  title: string;
  artwork: string;
  artists: string[];
  path: string;
};

type Playlist = {
  id: string;
  title: string;
  description: string;
  artworkPath?: string;
};

export interface PlaylistState {
  allPlaylists: Playlist[];
  allTracks: Track[];
  selectedTrack: Track;
}

const initialState: PlaylistState = {
  allTracks: trackList, //static data for now will be fetched
  allPlaylists: [
    {
      id: nanoid(),
      title: "All Songs",
      description: "This is a playlist for all your songs!",
      artworkPath: "./assets/images/album-cover.jpg",
    } as Playlist,
  ],
  selectedTrack: trackList[0],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
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

export const selectAllPlaylists = (state: RootState) => state.playlist.allPlaylists;
export const selectAllTracks = (state: RootState) => state.playlist.allTracks;

export default playlistSlice.reducer;
