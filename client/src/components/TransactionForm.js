import { useState } from "react";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Cookies from "js-cookie";

const categories = [
  { _id: '1', label: 'Salary', icon: '💰' },
  { _id: '2', label: 'Food', icon: '🍔' },
  { _id: '3', label: 'Transport', icon: '🚗' },
  { _id: '4', label: 'Shopping', icon: '🛒' },
  { _id: '5', label: 'Bills', icon: '💳' },
  { _id: '6', label: 'Entertainment', icon: '🎮' },
  { _id: '7', label: 'Healthcare', icon: '🏥' },
  { _id: '8', label: 'Education', icon: '📚' },
  { _id: '9', label: 'Investment', icon: '📈' },
  { _id: '10', label: 'Others', icon: '📌' }
];

export default function TransactionForm({ onSubmit, fetchTransactions }) {
  const [form, setForm] = useState({
    amount: "",
    date: new Date(),
    category: "",
    custoCategory: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const selectedCategory = categories.find(cat => cat._id === form.category);
  
      const formData = {
        amount: Number(form.amount),
        date: new Date(form.date).toISOString(),
        category: form.category === '10' ? 
        { ...selectedCategory, label: form.customCategory || 'Others' } : 
        selectedCategory
    };

  
      console.log('Sending data:', formData);
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save transaction');
      }
  
      const data = await response.json();
      console.log('Success:', data);
  
      // Clear form and update list
      setForm({
        amount: "",
        date: new Date().toISOString().split('T')[0],
        category: ""
      });
  
      if (fetchTransactions) {
        await fetchTransactions();
      }
    } catch (error) {
      console.error("Error details:", error);
      alert(error.message || 'Failed to save transaction. Please try again.');
    }
  }
  return (
    <Box  component="form" 
    onSubmit={handleSubmit} 
    className="transaction-form"
    sx={{ 
      display: 'flex', 
      gap: 2, 
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      '& .MuiTextField-root': { minWidth: '200px' },
      '& .MuiFormControl-root': { minWidth: '200px' }
    }}>
      <TextField
        size="small"
        type="number"
        name="amount"
        label="Amount (in EUR)"
        value={form.amount}
        onChange={handleChange}
      />
      <TextField
        size="small"
        type="date"
        name="date"
        label="Date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={form.category}
          onChange={handleChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.icon} {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {form.category === '10' && ( // Show custom input when "Others" is selected
        <TextField
          size="small"
          name="customCategory"
          label="Custom Category"
          value={form.customCategory}
          onChange={handleChange}
          sx={{ minWidth: 120 }}
        />
      )}
      <Button type="submit" 
      variant="contained" 
      className="submit-button"
      sx={{
        minWidth: '120px',
        height: '40px'
      }}>
        Submit
      </Button>
    </Box>
  );
}