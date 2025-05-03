import { serialize, parse } from "cookie";
import { NextResponse } from "next/server";

const TOKEN_NAME = "auth_token";

export const setCookie = (response: NextResponse, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
  });

  response.headers.append("Set-Cookie", cookie);
};

export const getCookie = (req: Request): string | undefined => {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return undefined;
  
  const cookies = parse(cookieHeader);
  return cookies[TOKEN_NAME];
};

export const removeCookie = (response: NextResponse) => {
  const cookie = serialize(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  response.headers.append("Set-Cookie", cookie);
};