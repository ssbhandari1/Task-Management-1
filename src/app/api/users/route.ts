import { getAllUsers } from "@/service/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch users", error }, { status: 500 });
  }
}
