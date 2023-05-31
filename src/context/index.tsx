import React from 'react';

type TrackContextType = {
  selectedTrack: string;
  setSelectedTrack: (track: string) => void;
};

export const TrackContext = React.createContext<TrackContextType>({
  selectedTrack: '',
  setSelectedTrack: () => {},
});
