
import { createTask, getTasks } from "@/service/task";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const tasks = await getTasks(userId);
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error fetching tasks' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const { title, description, status, dueDate } = await req.json();

    if (!title || !description || !status || !dueDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newTask = await createTask(title, description, status, dueDate, userId);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}