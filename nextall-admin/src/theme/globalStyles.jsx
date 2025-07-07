'use client';
// mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import { usePathname } from 'next/navigation';
// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <MUIGlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: '#000000 !important',
        },
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: '#000000 !important',
          color: '#ffffff',
        },
        '#root': {
          width: '100%',
          height: '100%',
          backgroundColor: '#000000 !important',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        '.MuiPopover-root': {
          backgroundColor: '#000000 !important',
        },
        '.MuiDrawer-paper': {
          backgroundColor: '#000000 !important',
        },
        '.MuiModal-root': {
          backgroundColor: '#000000 !important',
        },
        '.MuiDialog-paper': {
          backgroundColor: '#000000 !important',
        },
        '.MuiCard-root': {
          backgroundColor: '#000000 !important',
        },
        '.MuiList-root': {
          backgroundColor: '#000000 !important',
        },
        '.MuiMenu-paper': {
          backgroundColor: '#000000 !important',
        },
        '.MuiAppBar-root': {
          backgroundColor: '#000000 !important',
        },
        '.MuiToolbar-root': {
          backgroundColor: '#000000 !important',
        }
      }}
    />
  );
}
