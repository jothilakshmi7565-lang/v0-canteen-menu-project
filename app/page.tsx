"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">MCE Canteen</h1>
          <p className="text-muted-foreground">South Indian Delights at Your Doorstep</p>
        </div>

        {isLogin ? (
          <>
            <LoginForm />
            <p className="text-center text-muted-foreground mt-6 text-sm">
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-primary font-semibold hover:underline">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm />
            <p className="text-center text-muted-foreground mt-6 text-sm">
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-primary font-semibold hover:underline">
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
