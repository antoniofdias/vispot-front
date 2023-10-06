import { CorrelationSlider } from '@/components/CorrelationSlider';
import { SelectColor } from '@/components/SelectColor';
import { SelectPalette } from '@/components/SelectPalette';
import Box from '@mui/material/Box';
import { EdgeBundlingSettings } from './EdgeBundlingSettings';
import styles from './styles.module.css';

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
    <EdgeBundlingSettings />
  </Box>
);

export const SettingsDrawer = () => {
  return list();
};
