'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Typography, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import http from '@/services/http';
const countryList = [
  'Andorra', 'India', 'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 'France', 'Japan', 'China'
];

export default function AddShop() {
  const [form, setForm] = useState({
    logo: null,
    cover: null,
    title: '',
    slug: '',
    metaTitle: '',
    description: '',
    metaDescription: '',
    holderName: '',
    holderEmail: '',
    bankName: '',
    accountNumber: '',
    phoneNumber: '',
    country: '',
    city: '',
    state: '',
    streetAddress: ''
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (type === 'logo') setLogoPreview(ev.target.result);
        if (type === 'cover') setCoverPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    
    await http.post(
      '/admin/shops',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization header is handled globally in http.js
        },
      }
    );
    router.push('/admin/shops');
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" mb={1} fontWeight={600} sx={{ color: '#fff' }}>
          Add Shop
        </Typography>
        <Box sx={{ mb: 2, fontSize: 14, color: '#888' }}>
          <span>Dashboard &gt; Shops &gt; Add Shop</span>
        </Box>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 1, backgroundColor: '#18181c', borderRadius: 2 }}>
        <Grid container spacing={2}>
  <Grid item xs={12} md={8}>
    <Grid container spacing={2}>
      {/* Logo Upload */}
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 180, border: '2px dashed #4b4b50', background: '#18181c', mb: 2 }}>
          <Typography variant="body2" mb={1} sx={{ color: '#fff' }}>Logo <span style={{ fontSize: 12, color: '#aaa' }}>512 × 512</span></Typography>
          <label htmlFor="logo-upload" style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: 120, maxHeight: 120, margin: '0 auto', display: 'block', borderRadius: 10 }} />
            ) : (
              <Box sx={{ color: '#bbb', fontSize: 14, textAlign: 'center', py: 2 }}>
                Drop or Select image
                <Box>
                  <img src="/icons/upload.svg" alt="upload" width={64} height={64} style={{ marginTop: 8 }} />
                </Box>
              </Box>
            )}
            <input id="logo-upload" type="file" accept="image/*" hidden onChange={e => handleImageChange(e, 'logo')} />
          </label>
        </Paper>
      </Grid>
      {/* Title, Slug, Meta Title */}
      <Grid item xs={12} md={6}>
        <TextField label="Title" id="title" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
        <TextField label="Slug" id="slug" name="slug" value={form.slug} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
        <TextField label="Meta Title" id="metaTitle" name="metaTitle" value={form.metaTitle} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      </Grid>
      {/* Description, Meta Description */}
      <Grid item xs={12} md={6}>
        <TextField label="Description" id="description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" multiline minRows={4} sx={{ textarea: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label="Meta Description" id="metaDescription" name="metaDescription" value={form.metaDescription} onChange={handleChange} fullWidth margin="normal" multiline minRows={4} sx={{ textarea: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      </Grid>
      {/* Cover Upload */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 120, border: '2px dashed #4b4b50', background: '#18181c', mb: 2 }}>
          <Typography variant="body2" mb={1} sx={{ color: '#fff' }}>Cover <span style={{ fontSize: 12, color: '#aaa' }}>990 × 300</span></Typography>
          <label htmlFor="cover-upload" style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}>
            {coverPreview ? (
              <img src={coverPreview} alt="Cover Preview" style={{ maxWidth: 200, maxHeight: 80, margin: '0 auto', display: 'block', borderRadius: 10 }} />
            ) : (
              <Box sx={{ color: '#bbb', fontSize: 14, textAlign: 'center', py: 2 }}>
                Drop or Select image
                <Box>
                  <img src="/icons/upload.svg" alt="upload" width={64} height={64} style={{ marginTop: 8 }} />
                </Box>
              </Box>
            )}
            <input id="cover-upload" type="file" accept="image/*" hidden onChange={e => handleImageChange(e, 'cover')} />
          </label>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
  {/* Right column */}
  <Grid item xs={12} md={4}>
    <Paper variant="outlined" sx={{ p: 2, background: '#18181c' }}>
      <TextField label="Holder Name" id="holderName" name="holderName" value={form.holderName} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="Holder Email" id="holderEmail" name="holderEmail" value={form.holderEmail} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="Bank Name" id="bankName" name="bankName" value={form.bankName} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="Account Number" id="accountNumber" name="accountNumber" value={form.accountNumber} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="Phone Number" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <FormControl fullWidth margin="normal">
        <InputLabel id="country-label" sx={{ color: '#fff' }}>Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          name="country"
          value={form.country}
          label="Country"
          onChange={handleChange}
          required
          sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#666' } }}
        >
          {countryList.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="City" id="city" name="city" value={form.city} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="State" id="state" name="state" value={form.state} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <TextField label="Street Address" id="streetAddress" name="streetAddress" value={form.streetAddress} onChange={handleChange} fullWidth margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, '& label.Mui-focused': { color: '#fff' } }} />
      <Button
        type="submit"
        fullWidth
        sx={{
          mt: 2,
          fontWeight: 700,
          color: '#fff',
          py: 1.5,
          fontSize: 16,
          background: 'linear-gradient(90deg, #a700ff 0%, #ff00cc 50%, #00cfff 100%)',
          boxShadow: '0 2px 16px 0 rgba(167,0,255,0.10)',
          '&:hover': {
            background: 'linear-gradient(90deg, #a700ff 0%, #ff00cc 50%, #00cfff 100%)',
            opacity: 0.95
          }
        }}
      >
        Add Shop
      </Button>
    </Paper>
  </Grid>
</Grid>
      </Box>
    </Box>
  );
}
