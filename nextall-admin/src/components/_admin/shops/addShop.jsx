import React from 'react';
// components
import React, { useState } from 'react';
import ShopForm from 'src/components/forms/ShopForm';
import toast from 'react-hot-toast';
import * as api from 'src/services';

export default function AddShop() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (fields) => {
    setLoading(true);
    try {
      await api.addAdminShopByAdmin(fields);
      toast.success('Shop added successfully!');
      // Optionally reset or redirect here
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ShopForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}
