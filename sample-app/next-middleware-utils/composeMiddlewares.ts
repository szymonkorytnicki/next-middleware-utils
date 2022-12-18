import { NextResponse, NextRequest } from "next/server";
import { isRewriting } from "./isRewriting";
import { isRedirecting } from "./isResponseRedirecting";

type middlewareFunction = (request: NextRequest, response: NextResponse) => NextResponse | Promise<NextResponse>;

export function composeMiddlewares(...middlewares: middlewareFunction[]) {
  return async function composeMiddlewaresFn(request: NextRequest) {
    let response = NextResponse.next();
    for await (const middlewareFunction of middlewares) {
      const middlewareResponse = await middlewareFunction(request, response);
      if (isRedirecting(middlewareResponse)) {
        return middlewareResponse;
      }
      if (isRewriting(middlewareResponse)) {
        response = middlewareResponse;
      }
    }

    return response;
  };
}
