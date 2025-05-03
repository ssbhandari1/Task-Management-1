
'use client'
import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  statusColor: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, statusColor }) => {
  return (
    <div className="bg-gray-200 rounded p-4 w-full sm:w-1/3 min-h-[300px]">
      <h2 className="text-base font-semibold px-4 py-2 text-gray-600">{title}</h2>
      <div className="space-y-4 p-2 min-h-[250px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{task.description.slice(0, 80)}...</p>
              <span className={`mt-2 inline-block ${statusColor} text-white px-2 py-1 rounded-full text-sm`}>
                {task.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-10">No tasks in this section</div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn