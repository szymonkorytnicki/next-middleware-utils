import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isRedirecting } from "./isResponseRedirecting";

type middlewareFunction = (request: NextRequest, response: NextResponse) => NextResponse | Promise<NextResponse>;

export async function composeMiddlewares(middlewares: middlewareFunction[], request: NextRequest) {
  const response = NextResponse.next();
  for await (const middlewareFunction of middlewares) {
    const middlewareResponse = await middlewareFunction(request, response);
    if (isRedirecting(middlewareResponse)) {
      return middlewareResponse;
    }
  }

  return response;
}
