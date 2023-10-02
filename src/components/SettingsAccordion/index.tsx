import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { CorrelationSlider } from '../CorrelationSlider';
import { SelectColor } from '../SelectColor';
import { SelectPalette } from '../SelectPalette';
import styles from './styles.module.css';

export const SettingsAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.settingsRow}>
          <div className={styles.settingsItem}>
            <h3>Color by</h3>
            <SelectColor />
          </div>
          <div className={`${styles.settingsItem} ${styles.slider}`}>
            <h3>Correlation</h3>
            <CorrelationSlider />
          </div>
          <div className={styles.settingsItem}>
            <h3>Palette</h3>
            <SelectPalette />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
