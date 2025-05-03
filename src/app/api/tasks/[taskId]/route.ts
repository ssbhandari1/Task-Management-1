import { deleteTask, updateTask } from "@/service/task";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: { taskId: string } }) {
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
  { params }: { params: Record<string, string> }
) {
  try {
    const taskId = params.taskId;

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is missing" }, { status: 400 });
    }

    const { title, description, status, dueDate } = await req.json();

    if (!title || !description || !status || !dueDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updatedTask = await updateTask(taskId, { title, description, status, dueDate });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("PUT request error:", error);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}