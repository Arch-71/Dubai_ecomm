import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBar({ page, count, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
