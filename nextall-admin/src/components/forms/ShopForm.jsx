import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import ImageUploader from 'src/components/uploader/ImageUploader';

export default function ShopForm({ initialValues = {}, onSubmit, isLoading }) {
  const [fields, setFields] = useState({
    title: initialValues.title || '',
    slug: initialValues.slug || '',
    logo: initialValues.logo || null,
    cover: initialValues.cover || null,
    description: initialValues.description || '',
    status: initialValues.status || 'active',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImageChange = (name, fileObj) => {
    setFields({ ...fields, [name]: fileObj });
  };

  const validate = () => {
    let errs = {};
    if (!fields.title) errs.title = 'Title is required';
    if (!fields.slug) errs.slug = 'Slug is required';
    if (!fields.logo) errs.logo = 'Logo is required';
    if (!fields.cover) errs.cover = 'Cover image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(fields);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>{initialValues._id ? 'Edit Shop' : 'Add Shop'}</Typography>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={fields.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
        />
        <TextField
          label="Slug"
          name="slug"
          value={fields.slug}
          onChange={handleChange}
          error={!!errors.slug}
          helperText={errors.slug}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={fields.description}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
        />
        <ImageUploader
          label="Logo"
          value={fields.logo}
          onChange={(fileObj) => handleImageChange('logo', fileObj)}
          error={!!errors.logo}
        />
        <ImageUploader
          label="Cover Image"
          value={fields.cover}
          onChange={(fileObj) => handleImageChange('cover', fileObj)}
          error={!!errors.cover}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialValues._id ? 'Update Shop' : 'Add Shop'}
        </Button>
      </Stack>
    </Box>
  );
}

ShopForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
