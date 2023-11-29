import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname != "/auth/signin") {
    const token = req.cookies.get("next-auth.session-token")?.value;

    try {
      const payload = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET as string,
      });

      if (payload === null) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
      }

    //    console.log(`Your role is ${payload?.roleId}`);

    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
