"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import http from '@/services/http';
import { Box, Typography, Paper, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';

export default function EditCategoryPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [form, setForm] = useState({ name: '', slug: '', description: '', metaTitle: '', metaDescription: '', status: 'Active', cover: '' });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    http.get(`/admin/categories/${slug}`)
      .then(res => {
        if (res.data && res.data.data) setForm(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.put(`/admin/categories/${slug}`, form);
      setSnackbar({ open: true, message: 'Category updated successfully!', severity: 'success' });
      setTimeout(() => router.push('/admin/categories'), 1000);
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || 'Failed to update category', severity: 'error' });
    }
  };

  return (
    <Box sx={{ py: 5 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>Edit Category</Typography>
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
              <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={loading} fullWidth>Update Category</Button>
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
