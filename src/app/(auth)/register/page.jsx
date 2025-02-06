"use client";

import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
  const [ state, formAction, isPending ] = useActionState(register, undefined);

  console.log(isPending);
  
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input type="password" name="password"/>
        </div>
        <div>
          <label htmlFor="email">Confirm Password</label>
          <input type="text" name="confirmPassword" />
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">{ isPending ? "Loading..." : "Register" }</button>
          <Link href="/" className="text-link">or login here</Link>
        </div>
      </form>
    </div>
  );

}