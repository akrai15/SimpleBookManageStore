import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password });
      const userData = response.data;

      localStorage.setItem('bookuser', JSON.stringify(userData));
      setAuthUser(userData);

      toast.success('Signed up successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
