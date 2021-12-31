export type Track = {
  id: string;
  title: string;
  artwork: string;
  artists: string[];
  album: string;
  duration: string;
  path: string;
  dateAdded: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  artworkPath?: string;
};
