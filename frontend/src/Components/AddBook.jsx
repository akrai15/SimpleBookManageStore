import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Assuming Material-UI is used
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useBooks from '../zustand/useBooks'; // Zustand hook for managing books state

const AddBook = () => {
  const { setBooks } = useBooks(); // Zustand function to set books state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
    price: '',
    genre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate input fields
      if (!formData.title || !formData.author || !formData.publishYear || !formData.price) {
        toast.error('Please fill in all required fields.');
        return;
      }
      if (isNaN(formData.publishYear) || isNaN(formData.price) || formData.publishYear <= 0 || formData.price <= 0) {
        toast.error('Publish year and price must be valid numbers greater than zero.');
        return;
      }

      // Send POST request to backend to add the book
      const response = await axios.post('/api/books/add', formData);
      if (response.status === 200) {
        toast.success('Book added successfully!');
        
        // Update Zustand state with the new list of books
        const updatedBooks = await axios.get("/api/books");
        setBooks(updatedBooks.data);
        
        // Clear form after successful submission
        setFormData({
          title: '',
          author: '',
          publishYear: '',
          price: '',
          genre: '',
        });
      }
    } catch (error) {
      console.error('Failed to add book:', error);
      toast.error('Failed to add book.');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Publish Year"
          name="publishYear"
          type="number"
          value={formData.publishYear}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel>Genre (optional)</InputLabel>
          <Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-fiction">Non-fiction</MenuItem>
            <MenuItem value="Romance">Romance</MenuItem>
            {/* Add other genres as needed */}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
