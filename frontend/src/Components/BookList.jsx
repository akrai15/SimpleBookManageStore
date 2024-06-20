import React from 'react';
import useGetBooks from '../hooks/useGetBooks';
import { Button, Card, CardContent, Typography, AppBar, Toolbar, Box } from '@mui/material'; // Assuming you're using Material-UI
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useBooks from '../zustand/useBooks';
import { useAuthContext } from '../context/AuthContext';
import AddBook from './AddBook';
import { Link, Navigate } from 'react-router-dom';

const BookList = () => {
  const { books, setBooks } = useBooks(); // Use the Zustand store
  const { loading } = useGetBooks(); // Fetch books initially
  const { authUser, setAuthUser } = useAuthContext(); // Access auth context

  const handleLogout = () => {
    localStorage.removeItem('bookuser');
    setAuthUser(null);
    toast.success('Logged out successfully');
  };

  

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(`/api/books/delete/${bookId}`);
      if (response.status === 200) {
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);
        toast.success('Book deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
      toast.error('Failed to delete book');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Book List
          </Typography>
          {authUser && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {books.map((book) => (
            <Card key={book._id} sx={{ maxWidth: 300 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${book.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publish Year: {book.publishYear}
                </Typography>
                {book.genre && <Typography variant="body2" color="text.secondary">
                  genre: {book.genre}
                </Typography>}
                
                  


                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  {!authUser && (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary">
                        Login to Update
                      </Button>
                    </Link>
                  )}
                  {authUser && (
                    <Link to={`/update/${book._id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary">
                        Update
                      </Button>
                    </Link>
                  )}
                  {!authUser && (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary">
                        Login to Delete
                      </Button>
                    </Link>
                  )}
                  {authUser && (
                    <Button variant="contained" color="error" onClick={() => handleDelete(book._id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AddBook />
      </Box>
    </div>
  );
};

export default BookList;
