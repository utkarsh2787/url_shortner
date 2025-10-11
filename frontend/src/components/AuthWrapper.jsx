import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { loginThunk } from '../store/slice/authSlice';

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axiosInstance.get('/me', { withCredentials: true });
        if (response.data) {
          dispatch({ type: loginThunk.fulfilled.type, payload: response.data });
        }
      } catch (err) {
        dispatch({ type: loginThunk.fulfilled.type, payload: null });
      }
    }
    checkAuth();
  }, [dispatch]);

  return children;
}
