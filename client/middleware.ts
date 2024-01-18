// import {
//   withMiddlewareAuthRequired,
//   getSession,
// } from "@auth0/nextjs-auth0/edge";
// import { NextRequest, NextResponse } from "next/server";

// export default withMiddlewareAuthRequired(async function middleware(
//   req: NextRequest
// ) {

//   const pathname = req.nextUrl.pathname;
//   const method = req.method;
//   console.log(`🍎 middleware - pathname - ${method} ${pathname}`)

//   const response = NextResponse.next({
//     request: {
//       headers: new Headers(req.headers),
//     },
//   });
//   // Don't attach token for GET /api/idea
//   if (!(pathname === '/api/idea' && method === 'GET')) {
//     const user = await getSession(req, response);
//     const token = user?.accessToken;
//     response.headers.set("Authorization", `Bearer ${token}`);
//   }

//   return response;

// });

// export const config = {
//   matcher: ["/admin/:path*", "/api/:path*", "/test/:path*"],
// };

import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;
  console.log(`🍎 middleware - pathname - ${method} ${pathname}`);

  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  // Don't attach token for GET /api/idea
  if (!(pathname === "/api/idea" && method === "GET")) {
    const user = await getSession(req, response);
    const token = user?.accessToken;
    response.headers.set("Authorization", `Bearer ${token}`);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/test/:path*"],
};
