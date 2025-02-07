"use server"

import { getAuthUser } from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { redirect } from "next/dist/server/api-utils";

export async function createPost(state, formData) {
  // Check if user is signed in
  const user = await getAuthUser();
  if(!user) return redirect("/");

  // Validate form fields
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogPostSchema.safeParse({ title, content });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title, 
      content,
    };
  }

  console.log(title, content);

  // 


}
