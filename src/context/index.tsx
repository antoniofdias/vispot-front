import React from 'react';

type TrackContextType = {
  selectedTrack: number | null;
  setSelectedTrack: (track: number | null) => void;
};

export const TrackContext = React.createContext<TrackContextType>({
  selectedTrack: null,
  setSelectedTrack: () => {},
});
