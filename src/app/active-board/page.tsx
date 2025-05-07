'use client';
import TaskColumn from '@/components/ui/taskCard';
import useGetTask from '@/hooks/task/useGetTask';
import { Task } from '@/types/task';
import React, { useState } from 'react';



const Page = () => {
  const { tasks, user } = useGetTask();
  const [showMyTasks, setShowMyTasks] = useState(false);

  const filteredTasks = showMyTasks
    ? tasks.filter((task) => task.assignedTo?._id === user?.id)
    : tasks;

  const groupedTasks: Record<Task['status'], Task[]> = {
    Pending: [],
    'In Progress': [],
    Completed: [],
  };

  filteredTasks.forEach((task) => {
    groupedTasks[task.status].push(task);
  });
  return (
    <div className="text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Active Board</h1>
      <div className='text-white flex gap-3 mb-4'>
        <button
          onClick={() => setShowMyTasks(false)}
          className={`px-4 py-2 rounded ${!showMyTasks ? 'bg-blue-600' : 'bg-gray-600'} cursor-pointer`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setShowMyTasks(true)}
          className={`px-4 py-2 rounded ${showMyTasks ? 'bg-blue-600' : 'bg-gray-600'} cursor-pointer`}
        >
          My Tasks
        </button>
      </div>



      <div className="flex gap-6 justify-between p-2">
        <TaskColumn title="Pending" tasks={groupedTasks['Pending']} statusColor="bg-yellow-500" />
        <TaskColumn title="In Progress" tasks={groupedTasks['In Progress']} statusColor="bg-blue-500" />
        <TaskColumn title="Completed" tasks={groupedTasks['Completed']} statusColor="bg-green-500" />
      </div>
    </div>
  );
};

export default Page;