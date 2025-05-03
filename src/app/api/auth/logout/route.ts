import { removeCookie } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log(req.body)
    const response = NextResponse.json({ message: "Logout successful" },{ status: 200 });

    removeCookie(response);

    return response;
}