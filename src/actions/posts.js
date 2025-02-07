"use server";

import { getCollection } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {
  // Check if user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

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

  // Save post to db
  try {
    const postsCollection = await getCollection('posts');
    const post = {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      userId: ObjectId.createFromHexString(user.userId)
    }
    await postsCollection.insertOne(post)
  } catch (error) {
    return {
      errors: { title: error.message }
    }
  }
  redirect('/dashboard');
}

export async function updatePost(state, formData) {
  // Check if user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const validatedFields = BlogPostSchema.safeParse({ title, content });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Find post
  const postsCollection = await getCollection('posts');
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId)
  });

  // Check if user owns the post
  if (post?.userId.toHexString() !== user.userId) {
    return redirect("/");
  }

  // Update the post in DB
  try {
    await postsCollection.findOneAndUpdate({ _id: post._id }, {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
      }
    })
  } catch (error) {
    return {
      errors: { title: error.message }
    }
  }

  redirect('/dashboard');
}

export async function deletePost(formData) {
  // Check if user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields

  const postId = formData.get("postId");

  // Find post
  const postsCollection = await getCollection('posts');
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId)
  });

  // Check if user owns the post
  if (post?.userId.toHexString() !== user.userId) {
    return redirect("/");
  }

  // Delete the post in DB
  await postsCollection.findOneAndDelete({ _id: post._id })

  revalidatePath('/dashboard');
}

