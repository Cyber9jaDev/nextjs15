"use server";

// All the functions must run on the server side
// All the functions must be async
// All the functions must be named with "use server"



export async function register(previousState, formData){
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  console.log(email);
  console.log(password);
  console.log(confirmPassword);
}

export async function login(previousState, formData){
  console.log("Login action called");
}