import { AppContext } from '@/contexts/AppProvider';
import { Button } from '@mui/material';
import { useContext } from 'react';

interface ResetButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'secondary'
    | 'inherit'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  fullWidth: boolean;
}

export const ResetButton = ({
  variant = 'outlined',
  color = 'secondary',
  fullWidth,
}: ResetButtonProps) => {
  const { selectedTrack, setSelectedTrack } = useContext(AppContext);

  return (
    <Button
      disabled={selectedTrack === null}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      onClick={() => {
        setSelectedTrack(null);
      }}
    >
      Reset selection
    </Button>
  );
};
