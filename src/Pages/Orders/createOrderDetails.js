import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';

function EditOrderDetails() {
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [editableData, setEditableData] = useState(null);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSearchChange = (event) => {
    setOrderId(event.target.value);
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
    setMessage('');
  };

  const handleSearchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/order-details/getDetails?orderId=${orderId}&productName=${productName}`);
      const foundProduct = response.data;
      if (foundProduct) {
        setEditableData(foundProduct);
        setMessage('');
      } else {
        setMessage('Order not found');
        setEditableData(null);
      }
    } catch (error) {
      console.error('Error searching order:', error);
      setMessage('Error searching order');
    }
  };

  const handleInputChange = (event, key) => {
    setEditableData({ ...editableData, [key]: event.target.value });
  };

  const handleEditInventory = async () => {
    try {
      await axios.put(`http://localhost:8090/inventory?productName=${editableData.productName}&batchNo=${editableData.batchNumber}`, editableData);
      setSnackbarSeverity('success');
      setSnackbarMessage('Product Added Successfully');
      setSnackbarOpen(true);
      // Clear editableData after editing
      setEditableData(null);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error adding product');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
        <h2>Edit Order Details</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={handleSearchChange}
          margin="normal"
        />
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={handleProductNameChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearchOrder} style={{ marginLeft: '10px', marginTop: '10px' }}>
          Search
        </Button>
        {message && <Typography color="error">{message}</Typography>}
        {editableData && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Edit Order</Typography>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={editableData.productName || ''}
              onChange={(event) => handleInputChange(event, 'productName')}
              margin="normal"
            />
            <TextField
              label="Quantity Ordered"
              variant="outlined"
              fullWidth
              value={editableData.quantityOrdered || ''}
              onChange={(event) => handleInputChange(event, 'quantityOrdered')}
              margin="normal"
            />
            <TextField
              label="Total Price"
              variant="outlined"
              fullWidth
              value={editableData.totalPrice || ''}
              onChange={(event) => handleInputChange(event, 'totalPrice')}
              margin="normal"
            />
            <TextField
              label="Batch Number"
              variant="outlined"
              fullWidth
              value={editableData.batchNumber || ''}
              onChange={(event) => handleInputChange(event, 'batchNumber')}
              margin="normal"
            />
            <TextField
              label="Supplier Name"
              variant="outlined"
              fullWidth
              value={editableData.supplierName || ''}
              onChange={(event) => handleInputChange(event, 'supplierName')}
              margin="normal"
            />
            <TextField
              label="Purchase Date"
              variant="outlined"
              fullWidth
              value={editableData.purchaseDate || ''}
              onChange={(event) => handleInputChange(event, 'purchaseDate')}
              margin="normal"
            />
            <TextField
              label="Manufactured Date"
              variant="outlined"
              fullWidth
              value={editableData.manufacturedDate || ''}
              onChange={(event) => handleInputChange(event, 'manufacturedDate')}
              margin="normal"
            />
            <TextField
              label="Purchase Price"
              variant="outlined"
              fullWidth
              value={editableData.purchasePrice || ''}
              onChange={(event) => handleInputChange(event, 'purchasePrice')}
              margin="normal"
            />
            <TextField
              label="Expiration Date"
              variant="outlined"
              fullWidth
              value={editableData.expirationDate || ''}
              onChange={(event) => handleInputChange(event, 'expirationDate')}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleEditInventory} style={{ marginTop: '20px' }}>
              Edit Inventory
            </Button>
          </div>
        )}
      </Paper>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditOrderDetails;
