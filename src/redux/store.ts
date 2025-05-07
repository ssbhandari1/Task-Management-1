import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/slice';
import taskReducer from './task/slice';
import userReducer from './users/slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tasks: taskReducer,
		users: userReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;