import axios from 'axios';

// Base URL for API requests
const API_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch all users from the API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; // Return the fetched user data
  } catch (error) {
    throw new Error('Failed to fetch users'); // Handle errors gracefully
  }
};

// Function to add a new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data; // Return the newly created user data
  } catch (error) {
    throw new Error('Failed to add user'); // Display error if request fails
  }
};

// Function to update an existing user's data
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data; // Return the updated user details
  } catch (error) {
    throw new Error('Failed to update user'); // Error handling for API failures
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return id; // Return the deleted user's ID to confirm removal
  } catch (error) {
    throw new Error('Failed to delete user'); // Handle any deletion errors
  }
};
