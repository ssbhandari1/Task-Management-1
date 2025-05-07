import { deleteTask, updateTask } from "@/service/task";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params }) {
  try {
    const { taskId } = context.params;

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const deletedTask = await deleteTask(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}


export async function PUT(
  req: NextRequest,
  context: { params }
) {
  try {
    const { taskId } = context.params;

    const { title, description, status, dueDate, assigneeId } = await req.json();

    if (!title || !description || !status || !dueDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updatedTask = await updateTask(taskId, {
      title,
      description,
      status,
      dueDate,
      ...(assigneeId && { assignedTo: assigneeId }),
    });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

