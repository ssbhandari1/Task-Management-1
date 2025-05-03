import { Task } from '@/types/task';
import React, { useState } from 'react'


type ModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
};
const Modal = ({ task, onClose, onSave }: ModalProps) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Pending",
    dueDate: task.dueDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedTask = { ...task, ...formData };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-108">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;