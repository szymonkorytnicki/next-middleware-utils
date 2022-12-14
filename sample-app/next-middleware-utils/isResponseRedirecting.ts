import { type NextResponse } from "next/server";

export function isRedirecting(response: NextResponse): boolean {
  return response.headers.has("location");
}
