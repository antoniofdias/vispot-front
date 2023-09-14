import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext } from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = () => {
  const { data, loading } = useContext(DataContext);
  const {
    selectedTrack,
    setSelectedTrack,
    selectedPalette,
    selectedAttribute,
  } = useContext(AppContext);

  if (loading) {
    return <Skeleton variant="rectangular" width={40} height={40} />;
  }

  const tracks = data.songs;

  return tracks ? (
    <div>
      <Plot
        config={{
          displayModeBar: false,
          // responsive: true,
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
              color: tracks.map(
                (track) => track.colors[selectedPalette][selectedAttribute]
              ),
              colorscale: selectedPalette,
              colorbar: {
                title: selectedAttribute,
              },
              cmax: 1,
              cmin: 0,
              opacity: tracks.map((_, index) =>
                selectedTrack === null || index === selectedTrack - 1 ? 1 : 0.3
              ),
            },
          },
        ]}
        layout={{
          xaxis: {
            visible: false,
          },
          yaxis: {
            visible: false,
          },
          // hovermode: false,
        }}
        onClick={(event) => setSelectedTrack(event.points[0]?.pointNumber + 1)}
      />
    </div>
  ) : (
    <></>
  );
};

export default ScatterPlot;
