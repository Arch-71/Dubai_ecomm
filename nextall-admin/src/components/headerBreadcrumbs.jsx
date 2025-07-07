import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';

export default function HeaderBreadcrumbs({ heading, links = [], admin }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>{heading}</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        {admin && (
          <Link underline="hover" color="inherit" href="/admin">
            Admin
          </Link>
        )}
        {links.map((item, idx) =>
          item.href ? (
            <Link underline="hover" color="inherit" href={item.href} key={idx}>
              {item.name}
            </Link>
          ) : (
            <Typography color="text.primary" key={idx}>
              {item.name}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}
