import { CorrelationSlider } from '@/components/Navbar/SettingsDrawer/CorrelationSlider';
import { SelectColor } from '@/components/Navbar/SettingsDrawer/SelectColor';
import { SelectPalette } from '@/components/Navbar/SettingsDrawer/SelectPalette';
import { Chip, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { AddPlaylist } from './AddPlaylist';
import { EdgeBundlingSettings } from './EdgeBundlingSettings';
import styles from './styles.module.css';

interface CustomDividerProps {
  children: ReactNode;
}
const CustomDivider = ({ children }: CustomDividerProps) => {
  return (
    <Divider textAlign="left" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Chip label={children} />
    </Divider>
  );
};

const list = () => (
  <Box role="presentation" className={styles.box}>
    <CustomDivider>DATABASE</CustomDivider>
    <AddPlaylist />
    <CustomDivider>VISUAL ATTRIBUTES</CustomDivider>
    <div className={styles.settingsItem}>
      <h4>Color by</h4>
      <SelectColor />
    </div>
    <div className={styles.settingsItem}>
      <h4>Palette</h4>
      <SelectPalette />
    </div>
    <div className={styles.settingsItem}>
      <h4>Correlation</h4>
      <CorrelationSlider />
    </div>
    <CustomDivider>EDGE BUNDLING</CustomDivider>
    <EdgeBundlingSettings />
  </Box>
);

export const SettingsDrawer = () => {
  return list();
};
