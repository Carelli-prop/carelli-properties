import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isPreview = req.nextUrl.hostname.endsWith("vercel.app");

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const user = process.env.ADMIN_USER || "admin";
    const pass = process.env.ADMIN_PASSWORD;

    if (!pass) {
      return new NextResponse("Not found", { status: 404 });
    }

    const auth = req.headers.get("authorization");
    if (auth && auth.startsWith("Basic ")) {
      const decoded = atob(auth.slice(6));
      const split = decoded.indexOf(":");
      const u = decoded.slice(0, split);
      const p = decoded.slice(split + 1);
      if (u === user && p === pass) {
        const res = NextResponse.next();
        if (isPreview) res.headers.set("X-Robots-Tag", "noindex");
        return res;
      }
    }

    return new NextResponse("Sign in required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  const res = NextResponse.next();
  if (isPreview) {
    res.headers.set("X-Robots-Tag", "noindex");
  }
  return res;
}

export const config = { matcher: "/:path*" };
