import { connectToDB } from "@/lib/db";
import Task, { ITask } from "@/models/task";
import mongoose from "mongoose";


export const createTask = async (
  title: string,
  description: string,
  status: string,
  dueDate: string,
  userId: string
) => {
  try {
    await connectToDB();

    const objectId = new mongoose.Types.ObjectId(userId);

    const newTask: ITask = new Task({
      title,
      description,
      status,
      dueDate,
      userId: objectId,
    });

    await newTask.save();

    return newTask;
  } catch (error) {
    throw new Error("Error creating task: " + error);
  }
};

export const getTasks = async (userId: string) => {
  try {
    await connectToDB();
    const tasks = await Task.find({userId});
    return tasks;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching tasks');
  }
};

export const deleteTask = async (taskId: string) => {
  await connectToDB();
  
  const deletedTask = await Task.findByIdAndDelete(taskId);
  
  return deletedTask;
};


export const updateTask = async (taskId: string, updatedData: Partial<ITask>) => {
  await connectToDB();
  
  const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

  return updatedTask;
};