"use server";

// All the functions must run on the server side
// All the functions must be async
// All the functions must be named with "use server"

export async function login(state, formData){
  console.log("Login action called");
}

export async function register(state, formData){
  console.log("Register action called");
}