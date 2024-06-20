import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useBooks from '../zustand/useBooks';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, setBooks } = useBooks(); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
    price: '',
    genre: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          publishYear: book.publishYear,
          price: book.price,
          genre: book.genre || ' ',
        });
      } catch (error) {
        console.error('Failed to fetch book:', error);
        toast.error('Failed to fetch book.');
      }
    };
    
    fetchBook();
  }, [id]);

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

      // Send PUT request to backend to update the book
      const response = await axios.put(`/api/books/update/${id}`, formData);
      if (response.status === 200) {
        toast.success('Book updated successfully!');

        // Update Zustand state with the updated book
        const updatedBooks = books.map((book) =>
          book._id === id ? { ...book, ...formData } : book
        );
        setBooks(updatedBooks);

        // Redirect to the book list or another appropriate page
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to update book:', error);
      toast.error('Failed to update book.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Publish Year"
            name="publishYear"
            type="number"
            value={formData.publishYear}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
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
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UpdateBook;
