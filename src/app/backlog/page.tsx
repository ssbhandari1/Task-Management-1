'use client'
import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import { Task, TaskFormData } from "@/types/task";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { createTaskThunk, deleteTaskThunk, updateTaskThunk } from "@/redux/task/thunk";
import useGetTask from "@/hooks/task/useGetTask";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useGetUsers from "@/hooks/user/useGetUser";



const Page = () => {
  const dispatch = useAppDispatch();
  const { tasks, user } = useGetTask();
  const { users } = useGetUsers()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Delete Task
  const deleteTask = async (id: string) => {
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

  const saveTask = async (formData: TaskFormData, taskId?: string) => {
    if (isEditing && taskId) {
      await dispatch(updateTaskThunk({ taskId, updatedTask: formData })).unwrap();
    } else {
      await dispatch(createTaskThunk({ updatedTask: formData, id: user?.id })).unwrap();
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

        {tasks?.map((task) => {
          const assigneeInitial = task.assignedTo?.username?.charAt(0).toUpperCase();
          return (
            <div key={task?._id} className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-500 transition-colors">{task.title}</h3>
              <div className="py-3">
                <p className="text-sm text-gray-600 mt-2">{task?.description}</p>
              </div>

              <div className="mt-4 justify-between flex just">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="font-semibold">Status:</span> {task?.status}
                  <span className="font-semibold">Due Date:</span> {task?.dueDate}
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <FaEdit
                    onClick={() => openEditModal(task)}
                    className="text-blue-500 text-2xl cursor-pointer"
                  />
                  <MdDelete
                    onClick={() => deleteTask(task?._id)}
                    className="text-red-500 text-2xl cursor-pointer"
                  />
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                    {assigneeInitial}
                  </div>
                </div>

              </div>
            </div>
          )
        }
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          task={taskToEdit || undefined}
          users={users}
          onClose={closeModal}
          onSave={saveTask}
        />
      )}
    </div>
  );
};

export default Page;