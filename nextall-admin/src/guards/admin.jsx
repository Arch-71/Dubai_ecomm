'use client';
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }) {
  const router = useRouter();
  useEffect(() => {
    // Check for token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    // If no token or not admin, redirect
    if (!token || user.role !== 'admin') {
      router.replace('/admin/login');
    }
  }, [router]);
  return children;
}


AdminGuard.propTypes = {
  children: PropTypes.node.isRequired
};
