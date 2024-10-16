// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to load registered users from localStorage
const loadRegisteredUsers = () => {
  const storedUsers = localStorage.getItem('registeredUsers');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    registeredUsers: loadRegisteredUsers(), // Load users from localStorage
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.registeredUsers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.user = user; // Log in the user
      }
    },
    logout: (state) => {
      state.user = null; // Reset the user on logout
    },
    register: (state, action) => {
      const newUser = action.payload;
      state.registeredUsers.push(newUser); // Add new user to registered users
      // Update localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
