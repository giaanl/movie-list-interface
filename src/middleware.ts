import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./services/AuthService";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("MOVIE-LIST::TOKEN");
  const login_url = new URL("/login", req.url);
  const signUp_url = new URL("/signup", req.url);
  const management_url = new URL("/", req.url);

  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (!token) {
    if (
      req.nextUrl.pathname === login_url.pathname ||
      req.nextUrl.pathname === signUp_url.pathname
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(login_url);
  }

  if (req.nextUrl.pathname === login_url.pathname) {
    return NextResponse.redirect(management_url);
  }

  try {
    await AuthService.validToken(token.value);
  } catch (err) {
    const response = NextResponse.redirect(login_url);
    console.log(err)
    response.cookies.delete("MOVIE-LIST::TOKEN");
    return response;
  }
}
