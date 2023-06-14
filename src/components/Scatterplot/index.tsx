import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext, useState } from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = () => {
  const { data, loading } = useContext(DataContext);
  const { selectedTrack, setSelectedTrack } = useContext(AppContext);
  const [selectedColor, setSelectedColor] = useState<
    | 'duration_ms'
    | 'danceability'
    | 'energy'
    | 'loudness'
    | 'speechiness'
    | 'acousticness'
    | 'instrumentalness'
    | 'liveness'
    | 'valence'
    | 'tempo'
  >('acousticness');

  if (loading) {
    return <Skeleton variant="rectangular" width={40} height={40} />;
  }

  const tracks = data.songs;

  return tracks ? (
    <div>
      <Plot
        config={{
          displayModeBar: false,
        }}
        data={[
          {
            x: tracks.map((track) => track.x),
            y: tracks.map((track) => track.y),
            mode: 'markers',
            type: 'scatter',
            text: tracks.map((track) => track.name),
            marker: {
              size: 12,
              color: tracks.map((track) => track.colors[selectedColor]),
              colorscale: 'Viridis',
              colorbar: {
                title: selectedColor,
              },
              cmax: 1,
              cmin: 0,
              opacity: tracks.map((_, index) =>
                selectedTrack === null || index === selectedTrack - 1 ? 1 : 0.3
              ),
            },
          },
        ]}
        layout={
          {
            // hovermode: false,
          }
        }
        onClick={(event) => setSelectedTrack(event.points[0]?.pointNumber + 1)}
      />
      <div>
        <label>Select color:</label>
        <select
          value={selectedColor}
          onChange={(e) =>
            setSelectedColor(e.target.value as typeof selectedColor)
          }
        >
          {Object.keys(tracks[0].colors).map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ScatterPlot;
