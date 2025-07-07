'use client';

import PropTypes from 'prop-types';
import { Box, alpha } from '@mui/material';

export default function Scrollbar({ children, sx, ...other }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden auto',
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[600], 0.48),
        },
        '::-webkit-scrollbar-track': {
          borderRadius: 2,
          bgcolor: (theme) => theme.palette.divider,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
}; 