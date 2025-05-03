import axios from 'axios';

export const checkAuth = async () => {
  try {
    const response = await axios.get('/api/auth/me', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error('Authentication check failed');
  }
};