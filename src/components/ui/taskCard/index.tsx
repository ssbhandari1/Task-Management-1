
'use client'
import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  assignee?: string
};
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  statusColor: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500';
    case 'in progress':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-600';
    default:
      return 'bg-gray-400';
  }
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div className="bg-gray-200 rounded p-4 w-full sm:w-1/3 min-h-[300px]">
      <h2 className="text-base font-semibold px-4 py-2 text-gray-600">{title}</h2>
      <div className="space-y-4 p-2 min-h-[250px]">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const statusColor = getStatusColor(task.status);
            const assigneeInitial = task.assignee?.charAt(0).toUpperCase();

            return (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

                </div>

                <p className="text-sm text-gray-600 mb-4">{task.description.slice(0, 100)}...</p>

                <div className="flex justify-between items-center mt-auto">
                  <span
                    className={`inline-block ${statusColor} text-white px-2 py-1 rounded-full text-xs font-medium`}
                  >
                    {task.status}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                    {assigneeInitial}S
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-600 mt-10">No tasks in this section</div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
