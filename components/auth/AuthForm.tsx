"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Lock, User, ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase"

export function AuthForm() {
  const searchParams = useSearchParams()
  const initialMode = searchParams?.get("tab") === "signup" ? "signup" : "login"
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      window.location.href = "/dashboard"
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      window.location.href = "/dashboard"
    }

    setLoading(false)
  }

  return (
    <div className="w-full max-w-sm mx-auto shadow-card hover:shadow-card-hover rounded-[14px] bg-white p-8 transition-all duration-250 ease-out">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-dark">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-gray-500">
          {mode === "login"
            ? "Enter your email below to log into your account"
            : "Enter your details below to create your account"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-dark">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="John Doe"
                className="pl-10"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-dark">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="m@example.com"
              className="pl-10"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-dark">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-10"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {mode === "login" && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-brand-start focus:ring-brand-start w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-600 select-none">Remember me</span>
            </label>
            <a href="#" className="text-sm text-brand-start font-medium hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        {mode === "login" && (
          <div className="pt-2">
            <div className="relative flex items-center mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 text-dark font-medium border-gray-200 hover:border-gray-300 shadow-sm"
            >
              <ShieldCheck className="h-5 w-5 text-brand-start" />
              Face ID Verification
            </Button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-brand hover:opacity-90 font-semibold"
          disabled={loading}
        >
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-brand-start font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  )
}