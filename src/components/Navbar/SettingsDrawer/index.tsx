import { CorrelationSlider } from '@/components/CorrelationSlider';
import { SelectColor } from '@/components/SelectColor';
import { SelectPalette } from '@/components/SelectPalette';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import styles from './styles.module.css';

interface SettingsDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const list = () => (
  <Box role="presentation" className={styles.box}>
    <div className={styles.settingsItem}>
      <h3>Color by</h3>
      <SelectColor />
    </div>
    <div className={styles.settingsItem}>
      <h3>Palette</h3>
      <SelectPalette />
    </div>
    <div className={styles.settingsItem}>
      <h3>Correlation</h3>
      <CorrelationSlider />
    </div>
  </Box>
);

export const SettingsDrawer = ({
  drawerOpen,
  toggleDrawer,
}: SettingsDrawerProps) => {
  return (
    <Drawer
      anchor={'left'}
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: {
            xs: '90%', // Set width to 100% for screens smaller than 1024px
            sm: '20%', // Set width to 20% for screens larger than or equal to 1024px
          },
        },
      }}
    >
      {list()}
    </Drawer>
  );
};
