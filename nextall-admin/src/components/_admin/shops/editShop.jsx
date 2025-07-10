'use client';
import React from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
// components
import React, { useState } from 'react';
import ShopForm from 'src/components/forms/ShopForm';
import toast from 'react-hot-toast';
import * as api from 'src/services';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

EditShop.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default function EditShop({ slug }) {
  const { data, isLoading } = useQuery(
    ['shop-details', slug],
    () => api.getShopDetailsByAdmin(slug),
    {
      onError: (err) => {
        toast.error(err.response.data.message || 'Something went wrong!');
      },
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (fields) => {
    setLoading(true);
    try {
      await api.updateAdminShopByAdmin({ currentSlug: slug, ...fields });
      toast.success('Shop updated successfully!');
      // Optionally redirect or refresh here
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ShopForm initialValues={data?.data} onSubmit={handleSubmit} isLoading={loading || isLoading} />
    </div>
  );
}
