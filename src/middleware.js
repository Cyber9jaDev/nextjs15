import { NextResponse } from "next/server";
import { getAuthUser } from "./lib/getAuthUser";

const protectedRoutes = ["/dashboard", "posts/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  console.log("userId", userId);

  // if(isProtected && !userId){
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }

  // if(isPublic && userId){
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  // }

  return NextResponse.next();
}