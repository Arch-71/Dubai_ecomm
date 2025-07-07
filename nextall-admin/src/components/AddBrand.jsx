'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import http from '@/services/http';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

export default function AddBrand() {
  const [form, setForm] = useState({
    name: '',
    metaTitle: '',
    description: '',
    metaDescription: '',
    status: 'Active',
    logo: null
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Upload logo to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const logoData = new FormData();
      logoData.append('file', form.logo);
      logoData.append('upload_preset', uploadPreset);
      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        logoData
      );
      const logoUrl = cloudRes.data.secure_url;
      const logoId = cloudRes.data.public_id;
      // Generate slug from name
      const slug = form.name
        ? form.name.trim().toLowerCase().replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        : '';

      // 2. Send brand data to backend as JSON
      const payload = {
        ...form,
        slug,
        logo: {
          _id: logoId,
          url: logoUrl,
        },
      };
      await http.post('/admin/brands', payload);
      router.push('/admin/brands');
    } catch (err) {
      alert('Brand creation failed: ' + (err.response?.data?.message || err.message));
    }
  };


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        Brands List
      </Typography>
      <Box sx={{ mb: 2, fontSize: 14, color: '#888' }}>
        <span>Dashboard &gt; Brands &gt; Add Brand</span>
      </Box>
      <Paper elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <TextField
                label="Brand Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Meta Title"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                minRows={4}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Meta Description"
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                minRows={4}
              />
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2" mb={1}>
                  Logo
                  <span style={{ float: 'right', fontSize: 12, color: '#aaa' }}>512 × 512</span>
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', minHeight: 140 }}>
                  <label htmlFor="brand-logo-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    {logoPreview ? (
                      <img src={logoPreview} alt="Preview" style={{ maxWidth: 100, maxHeight: 100, margin: '0 auto' }} />
                    ) : (
                      <Box sx={{ color: '#bbb', fontSize: 14 }}>
                        Drop or Select image
                        <Box>
                          <img src="/icons/upload.svg" alt="upload" width={48} height={48} style={{ marginTop: 8 }} />
                        </Box>
                      </Box>
                    )}
                    <input
                      id="brand-logo-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleLogoChange}
                    />
                  </label>
                </Paper>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={form.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Brand
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
