export type TrackItem = {
  uri: string,
  name: string,
  duration_ms: number,
  explicit: boolean,
  artist: string,
  danceability: number,
  energy: number,
  key: number,
  loudness: number,
  speechiness: number,
  acousticness: number,
  instrumentalness: number,
  liveness: number,
  valence: number,
  tempo: number,
  x: number,
  y: number
};

export type DataTableProps = {
  rows: TrackItem[];
};

export type ApiResponseType = {
  songs: TrackItem[],
  correlation: any
}