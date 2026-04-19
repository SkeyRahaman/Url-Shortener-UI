import apiClient from '../../lib/axios';

// Create a new short URL
export const createUrl = async (url, description) => {
  // Passing parameters in the URL string as required by your spec
  const response = await apiClient.post(
    `/urls/create_short_url?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`
  );
  return response.data;
};

// Get all URLs for the logged-in user
export const getUserUrls = async (skip = 0, limit = 10) => {
  const response = await apiClient.get(`/urls?skip=${skip}&limit=${limit}`);
  return response.data;
};

// Delete a specific short URL
export const deleteUrl = async (shortUrl) => {
  const response = await apiClient.delete(`/urls/${shortUrl}`);
  return response.data;
};

// Update an existing short URL
export const updateUrl = async (shortUrl, urlData) => {
  // urlData expects: { long_url, description, short_url }
  const response = await apiClient.put(`/urls/${shortUrl}`, urlData);
  return response.data;
};

// Get details for a specific short URL
export const getUrlDetails = async (shortUrl) => {
  const response = await apiClient.get(`/urls/${shortUrl}/details`);
  return response.data;
};