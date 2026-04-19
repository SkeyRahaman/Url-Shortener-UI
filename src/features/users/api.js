import apiClient from '../../lib/axios';

// Create a new user (Registration)
export const registerUser = async (userData) => {
  // userData expects: { user_name, email, password }
  const response = await apiClient.post('/users', userData);
  return response.data;
};

// Get the logged-in user's profile
export const getCurrentUser = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

// Update the user's profile
export const updateCurrentUser = async (email, password) => {
  // Building query parameters as required by your OpenAPI spec
  const params = new URLSearchParams();
  if (email) params.append('email', email);
  if (password) params.append('password', password);
  
  const response = await apiClient.put(`/users/me?${params.toString()}`);
  return response.data;
};

// Delete the user's account
export const deleteCurrentUser = async () => {
  const response = await apiClient.delete('/users/me');
  return response.data;
};