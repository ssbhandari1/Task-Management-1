import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { setCookie } from "@/utils/cookies";
import { logInUser } from "@/service/auth";

export async function POST(req: NextRequest) {
    await connectToDB();

    function isError(obj: unknown): obj is Error {
        return typeof obj === "object" && obj !== null && "message" in obj;
    }

    try {
        const { email, password } = await req.json();

        // Use the service function to handle login
        const result = await logInUser(email, password);

        const response = NextResponse.json({
            message: "Login successful",
            userDetails: result.user,
        });

        // Set the token in cookies
        setCookie(response, result.token);
        return response;
    } catch (error) {
        if (isError(error)) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
    }

}

