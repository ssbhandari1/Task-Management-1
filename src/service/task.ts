import { connectToDB } from "@/lib/db";
import Task, { ITask } from "@/models/task";
import mongoose from "mongoose";


export const createTask = async (
  title: string,
  description: string,
  status: string,
  dueDate: string,
  createdBy: string,
  assignedTo?: string
) => {
  try {
    await connectToDB();

    const taskData: Partial<ITask> = {
      title,
      description,
      status,
      dueDate,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    };

    if (assignedTo) {
      taskData.assignedTo = new mongoose.Types.ObjectId(assignedTo);
    }

    const newTask = new Task(taskData);
    await newTask.save();

    return newTask;
  } catch (error) {
    throw new Error("Error creating task: " + error);
  }
};


export const getTasks = async (userId: string) => {
  try {
    await connectToDB();
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching tasks');
  }
};


export const getAllTasks = async () => {
  try {
    await connectToDB();

    return await Task.find()
      .populate("createdBy", "username email")
      .populate("assignedTo", "username email")
      .lean();
  } catch (error) {
    throw new Error("Error fetching all tasks: " + error);
  }
};

export const deleteTask = async (taskId: string) => {
  await connectToDB();

  const deletedTask = await Task.findByIdAndDelete(taskId);

  return deletedTask;
};


export const updateTask = async (taskId: string, updatedData: Partial<ITask>) => {
  await connectToDB();

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    updatedData,
    { new: true }
  ).populate("assignedTo");
  return updatedTask;
};