'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import http from '@/services/http';
import { Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    shop: '',
    category: '',
    subCategory: '',
    brand: '',
    size: '',
    color: '',
    gender: '',
    status: 'Sale',
    productCode: '',
    productSku: '',
    tags: '',
    metaTitle: '',
    description: '',
    slug: '',
    metaDescription: '',
    quantity: '',
    regularPrice: '',
    salePrice: '',
    featured: false,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const router = useRouter();

  // Example options for select fields (replace with actual data as needed)
  const shops = [
    { _id: '64b7e2f9d4a3c2f1e0d99999', name: 'Sacred Mayhem' }
  ];
  const categories = ['Watches'];
  const subCategories = ['Lifestyle'];
  const brands = ['Los Angeles'];
  const sizes = ['L', 'M', 'S'];
  const colors = ['Red', 'Blue', 'Green'];
  const genders = ['None', 'Male', 'Female', 'Unisex'];
  const statuses = ['Sale', 'Out of Stock', 'Draft'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Selected files:', files);
    setImages(files);
    const previews = files.map(file => {
      try {
        return URL.createObjectURL(file);
      } catch (err) {
        console.error('Error creating object URL:', err, file);
        return null;
      }
    });
    console.log('Image previews:', previews);
    setImagePreviews([...previews]); // force new array to trigger rerender
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    let uploadedImages = [];
    try {
      // 1. Upload each image to Cloudinary
      for (let img of images) {
        const imageData = new FormData();
        imageData.append('file', img);
        imageData.append('upload_preset', uploadPreset);
        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          imageData
        );
        uploadedImages.push({
          _id: cloudinaryRes.data.public_id,
          url: cloudinaryRes.data.secure_url
        });
      }
    } catch (err) {
      alert('Image upload failed');
      return;
    }
    // 2. Send product data (with Cloudinary URLs) to backend
    try {
      // Map frontend fields to backend model
      const payload = {
        name: form.name,
        shop: form.shop, // must be ObjectId string
        category: form.category, // must be ObjectId string
        subCategory: form.subCategory, // must be ObjectId string
        brand: form.brand, // must be ObjectId string
        size: form.size,
        color: form.color,
        gender: form.gender,
        status: form.status,
        code: form.productCode,
        sku: form.productSku,
        tags: form.tags.split(',').map(t => t.trim()),
        metaTitle: form.metaTitle,
        description: form.description,
        slug: form.slug,
        metaDescription: form.metaDescription,
        quantity: form.quantity,
        price: form.regularPrice,
        priceSale: form.salePrice,
        isFeatured: form.featured,
        images: uploadedImages,
      };
      await http.post(
        '/admin/products',
        payload
      );
      // Reset form and images
      setForm({
        name: '',
        shop: '',
        category: '',
        subCategory: '',
        brand: '',
        size: '',
        color: '',
        gender: '',
        status: 'Sale',
        productCode: '',
        productSku: '',
        tags: '',
        metaTitle: '',
        description: '',
        slug: '',
        metaDescription: '',
        quantity: '',
        regularPrice: '',
        salePrice: '',
        featured: false,
      });
      setImages([]);
      setImagePreviews([]);
      // Show success feedback
      alert('Product added successfully!');
      router.push('/admin/products');
    } catch (err) {
      alert('Product creation failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Title and Breadcrumbs */}
      <Typography variant="h5" mb={1} fontWeight={600}>
        Products List
      </Typography>
      <Box sx={{ mb: 2, fontSize: 14, color: '#888' }}>
        <span>Dashboard &gt; Products &gt; Add Product</span>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Product Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="shop-label">Shop</InputLabel>
                    <Select labelId="shop-label" id="shop-select" name="shop" value={form.shop} label="Shop" onChange={handleChange} required>
                      {shops.map((shop) => <MenuItem key={shop._id} value={shop._id}>{shop.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select labelId="category-label" id="category-select" name="category" value={form.category} label="Category" onChange={handleChange} required>
                      {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="subCategory-label">Sub Category</InputLabel>
                    <Select labelId="subCategory-label" id="subCategory-select" name="subCategory" value={form.subCategory} label="Sub Category" onChange={handleChange}>
                      {subCategories.map((sc) => <MenuItem key={sc} value={sc}>{sc}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select labelId="brand-label" id="brand-select" name="brand" value={form.brand} label="Brand" onChange={handleChange}>
                      {brands.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="size-label">Size</InputLabel>
                    <Select labelId="size-label" id="size-select" name="size" value={form.size} label="Size" onChange={handleChange}>
                      {sizes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select labelId="color-label" id="color-select" name="color" value={form.color} label="Color" onChange={handleChange}>
                      {colors.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select labelId="gender-label" id="gender-select" name="gender" value={form.gender} label="Gender" onChange={handleChange}>
                      {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select labelId="status-label" id="status-select" name="status" value={form.status} label="Status" onChange={handleChange}>
                      {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Product Code" name="productCode" value={form.productCode} onChange={handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Product SKU" name="productSku" value={form.productSku} onChange={handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Tags" name="tags" value={form.tags} onChange={handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      my: 3,
                      border: '2px dashed #333',
                      background: '#181818',
                      color: '#aaa',
                      textAlign: 'center',
                      minHeight: 180,
                      boxShadow: 'none',
                      borderRadius: 2,
                      borderColor: '#444',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      '&:hover': { borderColor: '#666' },
                    }}
                  >
                    <Typography variant="subtitle2" mb={1}>
                      Product Images <span style={{ fontSize: 12, color: '#aaa' }}>(*1024 × 1024)</span>
                    </Typography>
                    <label htmlFor="product-images-upload" style={{ cursor: 'pointer', display: 'block' }}>
                      {imagePreviews.length > 0 ? (
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                          {imagePreviews.map((src, idx) => (
                            <img key={idx} src={src} alt={`Preview ${idx + 1}`} style={{ maxWidth: 100, maxHeight: 100, margin: '0 auto', borderRadius: 6, border: '1px solid #222' }} />
                          ))}
                        </Box>
                      ) : (
                        <Box sx={{ color: '#bbb', fontSize: 16, py: 3 }}>
                          <Box sx={{ mb: 1 }}>Drop or Select Images</Box>
                          <Box>
                            <img src="/icons/upload.svg" alt="upload" width={48} height={48} style={{ marginTop: 8, opacity: 0.7 }} />
                          </Box>
                          <Box sx={{ mt: 2, color: 'red', fontSize: 12 }}>DEBUG: imagePreviews = {JSON.stringify(imagePreviews)}</Box>
                        </Box>
                      )}
                      <input
                        id="product-images-upload"
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                  </Paper>
                </Grid>
              </Grid>
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: 600 }}>
                  Create Product
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Meta Description" name="metaDescription" value={form.metaDescription} onChange={handleChange} fullWidth margin="normal" multiline minRows={3} />
            <TextField label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} fullWidth margin="normal" type="number" />
            <TextField label="Regular Price" name="regularPrice" value={form.regularPrice} onChange={handleChange} fullWidth margin="normal" type="number" />
            <TextField label="Sale Price" name="salePrice" value={form.salePrice} onChange={handleChange} fullWidth margin="normal" type="number" />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" />
              <label htmlFor="featured" style={{ marginLeft: 8 }}>Featured Product</label>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

