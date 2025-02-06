import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
   const requestHeaders = new Headers(request.headers);
   requestHeaders.set("cookie", "");
   return NextResponse.next({
      request: {
         headers: requestHeaders,
      },
   });
}

export const config = {
   matcher: "/api/event",
};
