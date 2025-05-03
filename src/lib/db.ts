import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement';
    const options: ConnectOptions = {
      dbName: 'taskmanagement',
    };


    const connection = await mongoose.connect(dbUri, options);
    isConnected = true;
    return connection;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to connect to MongoDB');
  }
};