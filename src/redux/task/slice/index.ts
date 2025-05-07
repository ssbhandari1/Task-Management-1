import { createSlice } from "@reduxjs/toolkit";
import { createTaskThunk, deleteTaskThunk, getAllTasksThunk, getUserTaksThunk, updateTaskThunk } from "../thunk";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  assignedTo?: User;   // optional in case not assigned
  createdBy: User;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  hasFetched:boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  hasFetched: false,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserTaksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.hasFetched = true;
      })
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.hasFetched = true;
      })
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;