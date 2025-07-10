'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
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

export default function AddCategory() {
  const [imageError, setImageError] = useState("");
  const [form, setForm] = useState({
    name: '',
    metaTitle: '',
    slug: '',
    description: '',
    metaDescription: '',
    status: 'Active',
    cover: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, cover: file }));
      setImageError("");
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cover) {
      setImageError("Please select an image.");
      return;
    }
    setImageError("");
    // 1. Upload image to Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const imageData = new FormData();
    imageData.append('file', form.cover);
    imageData.append('upload_preset', uploadPreset);
    let imageUrl = '';
    let publicId = '';
    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      console.log('Cloudinary upload response:', cloudinaryRes.data);
      imageUrl = cloudinaryRes.data.secure_url;
      publicId = cloudinaryRes.data.public_id;
    } catch (err) {
      console.error('Cloudinary upload error:', err.response ? err.response.data : err);
      setImageError(
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Image upload failed'
      );
      return;
    }
    // 2. Send category data (with Cloudinary URL) to backend
    let apiUrl = '';
    if (process.env.NEXT_PUBLIC_API_URL) {
      // If your backend is mounted under /api, use that
      if (process.env.NEXT_PUBLIC_API_URL.endsWith('/api')) {
        apiUrl = process.env.NEXT_PUBLIC_API_URL + '/admin/categories';
      } else {
        apiUrl = process.env.NEXT_PUBLIC_API_URL + '/admin/categories';
      }
    } else {
      setImageError('API URL is not set. Please check NEXT_PUBLIC_API_URL in your .env.local');
      return;
    }
    try {
      await http.post(
        apiUrl,
        {
          ...form,
          cover: {
            _id: publicId,
            url: imageUrl,
          },
        }
      );
      setForm({
        name: '',
        metaTitle: '',
        slug: '',
        description: '',
        metaDescription: '',
        status: 'Active',
        cover: null
      });
      setImagePreview(null);
      // Reset the file input value
      const fileInput = document.getElementById('category-image-upload');
      if (fileInput) fileInput.value = '';

      setSnackbar({ open: true, message: 'Category added successfully!', severity: 'success' });
      // Optionally, navigate after a short delay
      setTimeout(() => router.push('/admin/categories'), 1000);
    } catch (error) {
      console.error('Category creation error:', error?.response?.data || error);
setImageError(
  error?.response?.data?.message ||
  JSON.stringify(error?.response?.data) ||
  error.message ||
  'Failed to add category'
);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        Categories List
      </Typography>
      <Box sx={{ mb: 2, fontSize: 14, color: '#888' }}>
        <span>Dashboard &gt; Categories &gt; Add Category</span>
      </Box>
      <Paper elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <TextField
                label="Category Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                autoComplete="off"
                type="text"
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
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
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
                  Image
                  <span style={{ float: 'right', fontSize: 12, color: '#aaa' }}>512 × 512</span>
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', minHeight: 140 }}>
                  <label htmlFor="category-image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: 100, maxHeight: 100, margin: '0 auto' }} />
                    ) : (
                      <Box sx={{ color: '#bbb', fontSize: 14 }}>
                        Drop or Select image
                        {/* <Box> */}
                          {/* <img src="/icons/upload.svg" alt="upload" width={48} height={48} style={{ marginTop: 8 }} /> */}
                        {/* </Box> */}
                      </Box>
                    )}
                    <input
                      id="category-image-upload"
                      type="file"
                      name="cover"
                      accept="image/*"
                      
                      onChange={handleImageChange}
                    />
                    {imageError && (
                      <Typography color="error" fontSize={12} mt={1}>
                        {imageError}
                      </Typography>
                    )}
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
              Add Category
            </Button>
          </Box>
        </form>
      </Paper>
      {/* <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar(s => ({...s, open: false}))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}> */}
      {/* <Alert onClose={() => setSnackbar(s => ({...s, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}> */}
      {/* {snackbar.message} */}
      {/* </Alert> */}
      {/* </Snackbar> */}
    </Box>
  );
}
