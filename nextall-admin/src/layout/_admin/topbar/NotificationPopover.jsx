'use client';

import { useState } from 'react';
import { Badge, IconButton, Box, Typography } from '@mui/material';
import { IoNotificationsOutline } from 'react-icons/io5';
import MenuPopover from '@/components/popover';
import NoDataFoundIllustration from '@/components/illustrations/dataNotFound';

export default function NotificationsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Badge badgeContent={0} color="error">
          <IoNotificationsOutline size={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>
        </Box>
        <NoDataFoundIllustration />
      </MenuPopover>
    </>
  );
}
