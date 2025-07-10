import React from 'react';
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import * as api from 'src/services';

export default function DeleteDialog({ onClose, id, apicall, endPoint, type, deleteMessage }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Call the correct API endpoint by name
      await api[endPoint](id);
      toast.success(type || 'Deleted successfully!');
      if (apicall) apicall((v) => !v); // trigger parent refresh
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{deleteMessage || 'Are you sure you want to delete this item?'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleDelete} color="error" disabled={loading} startIcon={loading ? <CircularProgress size={18} /> : null}>
          Delete
        </Button>
      </DialogActions>
    </>
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  apicall: PropTypes.func,
  endPoint: PropTypes.string.isRequired,
  type: PropTypes.string,
  deleteMessage: PropTypes.string,
};
