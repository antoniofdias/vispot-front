import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext } from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = () => {
  const { data, loading } = useContext(DataContext);
  const {
    selectedTracks,
    setSelectedTracks,
    selectedPalette,
    selectedAttribute,
    hasMoreThanOnePlaylist,
  } = useContext(AppContext);

  const handleSelect = (event: any) => {
    const selectedPoints = event.points.map(
      (point: any) => point.pointNumber + 1
    );
    if (selectedPoints.length > 0) {
      setSelectedTracks(selectedPoints);
    }
  };

  if (loading) {
    return <Skeleton variant="rectangular" height="100%" />;
  }

  const tracks = data.songs;

  return tracks ? (
    <div>
      <Plot
        config={{
          displayModeBar: true,
          responsive: true,
        }}
        data={[
          {
            x: tracks.map((track) => track.x),
            y: tracks.map((track) => track.y),
            hoverinfo: 'text',
            mode: 'markers',
            type: 'scatter',
            text: tracks.map(
              (track) =>
                track.name +
                '<br>' +
                (hasMoreThanOnePlaylist ? `[${track.playlist}]` : '')
            ),
            marker: {
              size: 12,
              color: tracks.map(
                (track) => track.colors[selectedPalette][selectedAttribute]
              ),
              opacity: tracks.map((_, index) =>
                selectedTracks === null || selectedTracks?.includes(index + 1)
                  ? 1
                  : 0.3
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
          autosize: true,
        }}
        useResizeHandler
        onClick={(event) =>
          setSelectedTracks([event.points[0]?.pointNumber + 1])
        }
        onSelected={handleSelect}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  ) : (
    <></>
  );
};

export default ScatterPlot;
