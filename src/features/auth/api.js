import apiClient from '../../lib/axios';

export const loginUser = async (username, password) => {
  // Convert standard inputs into form data for FastAPI
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await apiClient.post('/auth/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  return response.data; 
};