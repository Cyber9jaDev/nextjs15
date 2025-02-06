"use server";

import { RegisterFormSchema } from "@/lib/rules";

// All the functions must run on the server side
// All the functions must be async
// All the functions must be named with "use server"

export async function register(previousState, formData){

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // const email = formData.get("email");
  // const password = formData.get("password");
  // const confirmPassword = formData.get("confirmPassword");

  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  console.log(validatedFields);
}
