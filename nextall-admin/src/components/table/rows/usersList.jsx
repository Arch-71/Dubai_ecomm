import React from 'react';

// This component renders a single user row for the admin users table.
// It expects props: row (user object), setId (for role dialog)
export default function UsersList({ row, setId }) {
  return (
    <tr>
      <td>{row.firstName} {row.lastName}</td>
      <td>{row.email}</td>
      <td>{row.phone || '-'}</td>
      <td>{row.orders ? row.orders.length : 0}</td>
      <td>{Array.isArray(row.role) ? row.role.join(', ') : row.role}</td>
      <td>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}</td>
      <td>
        <button onClick={() => setId(row._id)} style={{padding:'2px 8px',border:'1px solid #888',background:'#222',color:'#fff',borderRadius:4,cursor:'pointer'}}>Change Role</button>
      </td>
    </tr>
  );
}
