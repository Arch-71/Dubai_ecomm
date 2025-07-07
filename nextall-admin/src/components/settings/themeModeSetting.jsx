'use client';

import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { useDispatch } from '@/redux';
import { setThemeMode } from '@/redux/slices/settings';

export default function ThemeModeSetting() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    dispatch(setThemeMode(theme.palette.mode === 'light' ? 'dark' : 'light'));
  };

  return (
    <IconButton
      onClick={handleChangeMode}
      sx={{
        width: 40,
        height: 40,
      }}
    >
      {theme.palette.mode === 'light' ? <BsMoonStars size={20} /> : <BsSun size={20} />}
    </IconButton>
  );
} 