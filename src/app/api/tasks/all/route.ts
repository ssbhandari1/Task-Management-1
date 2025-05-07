import { getAllTasks } from "@/service/task";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    return NextResponse.json({ message: "Failed to fetch all tasks" }, { status: 500 });
  }
}
