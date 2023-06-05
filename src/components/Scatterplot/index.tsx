import Plot from 'react-plotly.js';
import { DataTableProps } from '../Table/types';

export const ScatterPlot = ({ rows }: DataTableProps) => {
  console.log(rows);
  return rows ? (
    <Plot
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
            color: rows.map((track) => track.colors.acousticness),
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
  ) : (
    <></>
  );
};
