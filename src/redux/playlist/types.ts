export type Track = {
  id: string;
  title?: string;
  artwork?: string;
  artists?: string[];
  album?: string;
  duration?: number;
  path?: string;
  dateAdded: number;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  artworkPath?: string;
};
