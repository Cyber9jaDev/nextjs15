import { cookies } from "next/headers";
import { decrypt } from "./sessions";

export async function getAuthUser(){
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  console.log("Session", session);

  if(session){
    const user = await decrypt(session);
    return user;
  }
}