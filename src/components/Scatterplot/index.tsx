import { TrackContext } from '@/context';
import { useContext, useState } from 'react';
import Plot from 'react-plotly.js';
import { DataTableProps } from '../Table/types';

const ScatterPlot = ({ rows }: DataTableProps) => {
  const { selectedTrack, setSelectedTrack } = useContext(TrackContext);
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

  return rows ? (
    <div>
      <Plot
        config={{
          displayModeBar: false,
        }}
        data={[
          {
            x: rows.map((track) => track.x),
            y: rows.map((track) => track.y),
            mode: 'markers',
            type: 'scatter',
            text: rows.map((track) => track.name),
            marker: {
              size: 12,
              color: rows.map((track) => track.colors[selectedColor]),
              colorscale: 'Viridis',
              colorbar: {
                title: selectedColor,
              },
              cmax: 1,
              cmin: 0,
              opacity: rows.map((_, index) =>
                selectedTrack === null || index === selectedTrack ? 1 : 0.3
              ),
            },
          },
        ]}
        layout={
          {
            // hovermode: false,
          }
        }
        onClick={(event) => setSelectedTrack(event.points[0]?.pointNumber)}
      />
      <div>
        <label>Select color:</label>
        <select
          value={selectedColor}
          onChange={(e) =>
            setSelectedColor(e.target.value as typeof selectedColor)
          }
        >
          {Object.keys(rows[0].colors).map((color, index) => (
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
