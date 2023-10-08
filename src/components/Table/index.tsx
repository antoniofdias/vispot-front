'use client';
import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  useGridApiRef,
} from '@mui/x-data-grid';
import { HTMLAttributes, useContext, useEffect } from 'react';

const columns: GridColDef[] = [
  // { field: 'uri', headerName: 'uri' },
  { field: 'name', headerName: 'name' },
  { field: 'duration_ms', headerName: 'duration' },
  { field: 'explicit', headerName: 'explicit' },
  { field: 'artist', headerName: 'artist' },
  { field: 'danceability', headerName: 'danceability' },
  { field: 'energy', headerName: 'energy' },
  { field: 'key', headerName: 'key' },
  { field: 'loudness', headerName: 'loudness' },
  { field: 'speechiness', headerName: 'speechiness' },
  { field: 'acousticness', headerName: 'acousticness' },
  { field: 'instrumentalness', headerName: 'instrumentalness' },
  { field: 'liveness', headerName: 'liveness' },
  { field: 'valence', headerName: 'valence' },
  { field: 'tempo', headerName: 'tempo' },
  // { field: 'x', headerName: 'x' },
  // { field: 'y', headerName: 'y' },
];

export const DataTable = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { data, loading } = useContext(DataContext);
  const { selectedTrack, setSelectedTrack } = useContext(AppContext);
  const apiRef = useGridApiRef();

  useEffect(() => {
    apiRef.current.setPage(
      Math.floor((selectedTrack ? selectedTrack - 1 : 0) / 5)
    );
    apiRef.current.selectRow(selectedTrack as GridRowId, true, true);
  }, [selectedTrack]);

  if (loading) {
    return (
      <div className={className}>
        <Skeleton variant="rectangular" height="100%" />
      </div>
    );
  }

  const rows = data.songs;

  return rows !== undefined ? (
    <div
      style={{ height: 400, maxWidth: '95vw', padding: 10 }}
      className={className}
    >
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => setSelectedTrack(params.row.id)}
        hideFooterSelectedRowCount
        autoHeight
      />
    </div>
  ) : (
    <></>
  );
};
