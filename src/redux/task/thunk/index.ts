import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TaskPayload {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async ({ updatedTask, id }: { updatedTask: TaskPayload; id: string | undefined }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/tasks?userId=${id}`, updatedTask);
      console.log("createTaskThunk",response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create task");
    }
  }
);


export const getUserTaksThunk = createAsyncThunk(
  "tasks/getUserTask",
  async ( id : string | undefined , { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/tasks?userId=${id}`);
      console.log('responsessaa',{response})
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create task");
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete task");
    }
  }
)

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedTask }: { taskId: string | undefined; updatedTask: Partial<TaskPayload> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, updatedTask);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
  }
);