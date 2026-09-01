"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth";

export default function AdminLogin() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-[#070F1F] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-[#0A1931]">SAFE Guard FORCE</h1>
          <p className="text-slate-500 text-sm mt-2">Admin Control Panel</p>
        </div>

        <form action={action} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-medium">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-slate-300 rounded px-4 py-2.5 focus:ring-2 focus:ring-[#C5A253] focus:border-[#C5A253] outline-none transition"
              placeholder="admin@safeguardforce.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-slate-300 rounded px-4 py-2.5 focus:ring-2 focus:ring-[#C5A253] focus:border-[#C5A253] outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0A1931] hover:bg-[#132D4F] text-white font-bold tracking-widest uppercase text-sm py-3.5 rounded transition disabled:opacity-70 flex justify-center"
          >
            {isPending ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
