type Color = {
  duration_ms: string;
  danceability: string;
  energy: string;
  loudness: string;
  speechiness: string;
  acousticness: string;
  instrumentalness: string;
  liveness: string;
  valence: string;
  tempo: string;
  playlist: string;
};

export type TrackItem = {
  id: number;
  uri: string;
  name: string;
  playlist: string;
  duration_ms: number;
  explicit: boolean;
  artist: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  x: number;
  y: number;
  colors: {
    viridis: Color;
    cividis: Color;
    jet: Color;
    hot: Color;
    plasma: Color;
    copper: Color;
  };
};

export type DataTableProps = {
  rows: TrackItem[];
};

export type ApiResponseType = {
  songs: TrackItem[];
  correlation: any;
};
