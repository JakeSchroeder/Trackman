export type Track = {
  id: string;
  title: string;
  artwork: string;
  artists: string[];
  path: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  artworkPath?: string;
};
