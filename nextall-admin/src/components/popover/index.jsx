'use client';

import PropTypes from 'prop-types';
import { Popover } from '@mui/material';

export default function MenuPopover({ children, sx, ...other }) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
}; 