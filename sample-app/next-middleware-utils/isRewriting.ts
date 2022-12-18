import { NextResponse } from "next/server";

export function isRewriting(response: NextResponse): boolean {
  return response.headers.has("x-middleware-rewrite");
}
