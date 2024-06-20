import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material'; // Assuming you're using Material-UI
import { useNavigate } from 'react-router-dom';
import  useLogin  from '../hooks/useLogin.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(email, password);
      navigate('/');
    }
    catch(error){
      console.error("Login error:", error);
      toast .error("Failed to login");
    }
    
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Typography variant="body2" style={{ marginTop: '1rem' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
