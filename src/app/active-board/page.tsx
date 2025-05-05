'use client';
import TaskColumn from '@/components/ui/taskCard';
import useGetTask from '@/hooks/task/useGetTask';
import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
};

const Page = () => {
  const { tasks } = useGetTask();

  const groupedTasks: Record<Task['status'], Task[]> = {
    Pending: [],
    'In Progress': [],
    Completed: [],
  };

  tasks.forEach((task) => {
    groupedTasks[task.status].push(task);
  });

  return (
    <div className="text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Active Board</h1>

      <div className="flex gap-6">
        <TaskColumn title="Pending" tasks={groupedTasks['Pending']} statusColor="bg-yellow-500" />
        <TaskColumn title="In Progress" tasks={groupedTasks['In Progress']} statusColor="bg-blue-500" />
        <TaskColumn title="Completed" tasks={groupedTasks['Completed']} statusColor="bg-green-500" />
      </div>
    </div>
  );
};

export default Page;