import React from 'react';

export default function Table({ headData, data, isLoading, row: RowComponent, ...props }) {
  if (isLoading) return <div>Loading...</div>;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headData.map((head) => (
            <th key={head.id} style={{ textAlign: head.alignRight ? 'right' : 'left', padding: 8, borderBottom: '1px solid #eee' }}>
              {head.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((rowData) => <RowComponent key={rowData._id || rowData.id} row={rowData} {...props} />)
        ) : (
          <tr>
            <td colSpan={headData.length} style={{ textAlign: 'center', padding: 16 }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
