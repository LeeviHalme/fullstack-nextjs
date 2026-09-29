"use client";

import { registerUser } from "@/app/actions/users";
import { useActionState } from "react";

const initialState: { errors: { [key: string]: string }; values: { [key: string]: string } } = {
  errors: {},
  values: {},
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            type="text"
            name="username"
            defaultValue={state.values?.username}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.username && (
          <p style={{ color: "red" }}>{state.errors.username}</p>
        )}
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            defaultValue={state.values?.name}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            defaultValue={state.values?.password}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.password && (
          <p style={{ color: "red" }}>{state.errors.password}</p>
        )}
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input type="password" name="passwordConfirm" className="border rounded p-2 flex-1" />
        </div>
        {state.errors && state.errors?.passwordConfirm && (
          <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
        )}
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
}
