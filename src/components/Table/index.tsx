'use client';
import { TrackContext } from '@/context';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext } from 'react';
import { DataTableProps } from './types';

const columns: GridColDef[] = [
  { field: 'uri', headerName: 'uri', width: 70 },
  { field: 'name', headerName: 'name', width: 70 },
  { field: 'duration_ms', headerName: 'duration', width: 70 },
  { field: 'explicit', headerName: 'explicit', width: 70 },
  { field: 'artist', headerName: 'artist', width: 70 },
  { field: 'danceability', headerName: 'danceability', width: 70 },
  { field: 'energy', headerName: 'energy', width: 70 },
  { field: 'key', headerName: 'key', width: 70 },
  { field: 'loudness', headerName: 'loudness', width: 70 },
  { field: 'speechiness', headerName: 'speechiness', width: 70 },
  { field: 'acousticness', headerName: 'acousticness', width: 70 },
  { field: 'instrumentalness', headerName: 'instrumentalness', width: 70 },
  { field: 'liveness', headerName: 'liveness', width: 70 },
  { field: 'valence', headerName: 'valence', width: 70 },
  { field: 'tempo', headerName: 'tempo', width: 70 },
  { field: 'x', headerName: 'x', width: 70 },
  { field: 'y', headerName: 'y', width: 70 },
];

export const DataTable = ({ rows }: DataTableProps) => {
  const { selectedTrack, setSelectedTrack } = useContext(TrackContext);

  return rows !== undefined ? (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={
          selectedTrack === null
            ? rows
            : [
                rows.find((row) => row.id === selectedTrack),
                ...rows.filter((row) => row.id !== selectedTrack),
              ]
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => setSelectedTrack(params.row.id)}
        hideFooterSelectedRowCount
      />
    </div>
  ) : (
    <></>
  );
};
