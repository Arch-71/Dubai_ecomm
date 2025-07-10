import React from 'react';

export default function Category({ row }) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.description || '-'}</td>
      <td>{row.status}</td>
      <td>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}</td>
      <td>{/* Actions handled in parent */}</td>
    </tr>
  );
}
