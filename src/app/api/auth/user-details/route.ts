
import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";
import { verifyToken } from "@/lib/auth";
import { getUserById } from "@/service/auth";

export async function GET(req: Request) {
  try {
    const token = getCookie(req);
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await getUserById(decodedToken.id);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 404 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error fetching user details" }, { status: 500 });
  }
}