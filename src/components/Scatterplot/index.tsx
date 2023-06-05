import { useState } from 'react';
import Plot from 'react-plotly.js';
import { DataTableProps } from '../Table/types';

const ScatterPlot = ({ rows }: DataTableProps) => {
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
            // name: 'Team A',
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
            },
          },
        ]}
        layout={
          {
            // title: 'Data Labels Hover',
          }
        }
        onClick={(event) => console.log(event.points)}
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
