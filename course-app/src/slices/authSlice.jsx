import { createSlice } from '@reduxjs/toolkit';

const loadRegisteredUsers = () => {
  const storedUsers = localStorage.getItem('registeredUsers');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    registeredUsers: loadRegisteredUsers(), 
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.registeredUsers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.user = user; 
      }
    },
    logout: (state) => {
      state.user = null; 
    },
    register: (state, action) => {
      const newUser = action.payload;
      state.registeredUsers.push(newUser); 
      localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
