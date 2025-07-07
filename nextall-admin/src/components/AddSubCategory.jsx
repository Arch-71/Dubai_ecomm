'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AddSubCategory() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/sub-categories', { name, slug, mainCategory });
    router.push('/admin/sub-categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Sub Category Name" required />
      <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" required />
      <input value={mainCategory} onChange={e => setMainCategory(e.target.value)} placeholder="Main Category" required />
      <button type="submit">Add Sub Category</button>
    </form>
  );
}
