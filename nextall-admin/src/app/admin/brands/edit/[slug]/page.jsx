"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import http from '@/services/http';
import { Box, Typography, Paper, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';

export default function EditBrandPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [form, setForm] = useState({ name: '', slug: '', description: '', metaTitle: '', metaDescription: '', status: 'Active', logo: { _id: '', url: '', blurDataURL: '' } });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    http.get(`/admin/brands/${slug}`)
      .then(res => {
        if (res.data && res.data.data) {
          // Ensure logo object is present
          if (!res.data.data.logo) {
            res.data.data.logo = { _id: '', url: '', blurDataURL: '' };
          }
          setForm(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('logo.')) {
      const logoField = name.split('.')[1];
      setForm(prev => ({ ...prev, logo: { ...prev.logo, [logoField]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.put(`/admin/brands/${slug}`, form);
      setSnackbar({ open: true, message: 'Brand updated successfully!', severity: 'success' });
      setTimeout(() => router.push('/admin/brands'), 1000);
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || 'Failed to update brand', severity: 'error' });
    }
  };

  return (
    <Box sx={{ py: 5 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>Edit Brand</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={3} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Meta Description" name="metaDescription" value={form.metaDescription} onChange={handleChange} fullWidth multiline minRows={2} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Logo URL" name="logo.url" value={form.logo?.url || ''} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={loading} fullWidth>Update Brand</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
