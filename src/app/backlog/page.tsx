'use client'
import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import { Task } from "@/types/task";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { createTaskThunk, deleteTaskThunk, updateTaskThunk } from "@/redux/task/thunk";
import useGetTask from "@/hooks/task/useGetTask";


const Page = () => {
  const dispatch = useAppDispatch();
  const { tasks, user } = useGetTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Delete Task
  const deleteTask = async(id: string) => {
    await dispatch(deleteTaskThunk(id))
  };

  // Open Edit Modal
  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Open Add Task Modal (Empty Form)
  const openAddModal = () => {
    setTaskToEdit(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const saveTask = async (updatedTask: Task) => {
    if (isEditing) {
      // Call update thunk when editing an existing task
      await dispatch(updateTaskThunk({ taskId: updatedTask?._id, updatedTask })).unwrap();
    } else {
      // Call create thunk when adding a new task
      await dispatch(createTaskThunk({ updatedTask, id: user?.id })).unwrap();
    }
    closeModal();
  };

  return (
    <div className="bg-gray-200 text-black mt-10 w-full min-h-[60vh] p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-end gap-2">
          <h1 className="text-xl font-bold">Backlog</h1>
          <span className="text-base">{tasks.length} Task{tasks.length !== 1 ? "s" : ""}</span>
        </div>
        <button onClick={openAddModal} className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-500">
          Add Task
        </button>
      </div>


      <div>
        {tasks?.map((task) => (
          <div key={task?._id} className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-400 transition-colors">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{task?.description}</p>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <div>
                <span className="font-semibold">Status:</span> {task?.status}
              </div>
              <div>
                <span className="font-semibold">Due Date:</span> {task?.dueDate}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => openEditModal(task)}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-5 py-2 rounded-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task?._id)}
                className="bg-gradient-to-r from-red-400 to-red-500 text-white px-5 py-2 rounded-md hover:from-red-500 hover:to-red-400 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          task={taskToEdit || { title: "", description: "", status: "Pending", dueDate: "" }} // Empty task for new entries
          onClose={closeModal}
          onSave={saveTask}
        />
      )}
    </div>
  );
};

export default Page;