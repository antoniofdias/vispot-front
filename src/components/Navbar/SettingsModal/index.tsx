import { CorrelationSlider } from '@/components/CorrelationSlider';
import { SelectColor } from '@/components/SelectColor';
import { SelectPalette } from '@/components/SelectPalette';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface SettingsModalProps {
  open: boolean;
  toggleOpen: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const SettingsModal = ({ open, toggleOpen }: SettingsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={toggleOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        <Typography id="select-color-label" variant="h6" component="h2">
          Color elements by
        </Typography>
        <SelectPalette />
        <SelectColor />
        <Typography
          id="lyric-slider-label"
          variant="h6"
          component="h2"
          sx={{ mt: 2 }}
        >
          Lyrical correlation range
        </Typography>
        <CorrelationSlider />
      </Box>
    </Modal>
  );
};
