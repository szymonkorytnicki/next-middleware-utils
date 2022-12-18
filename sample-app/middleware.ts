import { NextRequest } from "next/server";
import { composeMiddlewares } from "./next-middleware-utils/composeMiddlewares";
import { isFile } from "./next-middleware-utils/isFile";
import { isPage } from "./next-middleware-utils/isPage";

const pageMiddleware = (req, res) => {
  if (isPage(req.nextUrl.pathname)) {
    console.log("page", req.nextUrl.pathname);
  }
  return res;
};

const fileMiddleware = (req, res) => {
  if (isFile(req.nextUrl.pathname)) {
    console.log("file", req.nextUrl.pathname);
  }
  return res;
};
export default async function middleware(req: NextRequest) {
  return await composeMiddlewares(pageMiddleware, fileMiddleware)(req);
}
