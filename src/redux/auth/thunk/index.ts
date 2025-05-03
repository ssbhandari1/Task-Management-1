import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';

export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ authenticated: boolean; user?: User }>("/api/auth/user-details");
      if (!res.data.authenticated || !res.data.user) {
        throw new Error("User not authenticated");
      }

      return res.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue("Failed to verify authentication");
    }
  }
)