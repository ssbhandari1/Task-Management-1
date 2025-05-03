import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  userId: mongoose.Types.ObjectId;
  
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
  dueDate: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;