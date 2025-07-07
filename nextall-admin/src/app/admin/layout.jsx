'use client'

import { Box } from '@mui/material'
import AdminGuard from '@/guards/admin'
import MiniDrawer from '@/layout/_admin';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <AdminGuard>
      <MiniDrawer>
        <Box
          key={pathname}
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </MiniDrawer>
    </AdminGuard>
  );
}