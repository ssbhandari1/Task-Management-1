// types.ts
export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  assignedTo?: User;   // optional in case not assigned
  createdBy: User;
}
  export type TaskFormData = {
    title: string;
    description: string;
    status: string;
    dueDate: string;
    assigneeId: string;
  };
  