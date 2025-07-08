import React, { useState } from 'react';
import { Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';

export default function BrandForm({ onSubmit, initialValues = {} }) {
  const [name, setName] = useState(initialValues.name || '');
  const [logo, setLogo] = useState(initialValues.logo || '');
  const [products, setProducts] = useState(initialValues.products || 0);
  const [featured, setFeatured] = useState(initialValues.featured || false);
  const [status, setStatus] = useState(initialValues.status || true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, logo, products, featured, status });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField label="Brand Name" value={name} onChange={e => setName(e.target.value)} required />
      <TextField label="Logo URL" value={logo} onChange={e => setLogo(e.target.value)} />
      <TextField label="Products" type="number" value={products} onChange={e => setProducts(Number(e.target.value))} />
      <FormControlLabel control={<Switch checked={featured} onChange={e => setFeatured(e.target.checked)} />} label="Featured" />
      <FormControlLabel control={<Switch checked={status} onChange={e => setStatus(e.target.checked)} />} label="Active" />
      <Button type="submit" variant="contained">Save Brand</Button>
    </Box>
  );
}
