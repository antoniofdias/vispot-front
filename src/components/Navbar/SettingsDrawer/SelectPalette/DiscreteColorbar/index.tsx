import { Box, Typography } from '@mui/material';

export const DiscreteColorBar = ({ colors }: any) => {
  return (
    <>
      <Box style={{ display: 'flex', marginTop: '1rem' }}>
        {colors.map((color: any, index: any) => (
          <svg
            key={index}
            width="100%"
            height="34"
            viewBox="0 0 34 34"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: color }}
          >
            <rect width="34" height="34" rx="4" ry="4" fill={color} />
          </svg>
        ))}
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>0</Typography>
        <Typography>1</Typography>
      </Box>
    </>
  );
};
