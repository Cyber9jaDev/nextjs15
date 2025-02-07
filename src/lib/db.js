import "server-only";

import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DB_URI) {
  throw new Error('DB_URI must be defined')
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client.db(dbName)
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName) {
  const db = await getDB("nextjs15");
  if (db) { return db.collection(collectionName) }

  return null
}


// import { NextResponse } from "next/server";
// import { getAuthUser } from "./lib/getAuthUser";

// const protectedRoutes = ["/dashboard", "/posts/create"];
// const publicRoutes = ["/login", "/register"];

// export default async function middleware(req) {
//   const path = req.nextUrl.pathname;
//   const isProtected = protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
//   const isPublic = publicRoutes.includes(path);

//   const user = await getAuthUser();
//   const userId = user?.userId;

//   if (isProtected && !userId) {
//     // return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   if (isPublic && userId) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };