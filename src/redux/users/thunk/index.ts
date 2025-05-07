import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch all tasks");
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);
