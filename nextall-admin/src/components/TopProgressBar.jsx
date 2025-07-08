import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LinearProgress, Box } from '@mui/material';

export default function TopProgressBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen to route change events
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Next.js App Router does not have Router.events, so use browser events
    window.addEventListener('next-route-start', handleStart);
    window.addEventListener('next-route-complete', handleComplete);
    window.addEventListener('next-route-error', handleComplete);

    return () => {
      window.removeEventListener('next-route-start', handleStart);
      window.removeEventListener('next-route-complete', handleComplete);
      window.removeEventListener('next-route-error', handleComplete);
    };
  }, []);

  return loading ? (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}>
      <LinearProgress sx={{ height: 4, background: 'transparent', '& .MuiLinearProgress-bar': {
        background: 'linear-gradient(90deg, #a700ff 0%, #ff00cc 50%, #00cfff 100%)'
      } }} />
    </Box>
  ) : null;
}
