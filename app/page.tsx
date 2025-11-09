"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [screen, setScreen] = useState<"role" | "login" | "signup">("role")
  const [userType, setUserType] = useState<"user" | "chef" | null>(null)

  const handleRoleSelect = (role: "user" | "chef") => {
    setUserType(role)
    setScreen("login")
  }

  const handleSwitchToSignup = () => {
    setScreen("signup")
  }

  const handleSwitchToLogin = () => {
    setScreen("login")
  }

  const handleBackToRole = () => {
    setScreen("role")
    setUserType(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {screen === "role" ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">MEC Canteen</h1>
              <p className="text-muted-foreground">South Indian Delights at Your Doorstep</p>
            </div>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
              <div className="space-y-4">
                <Button
                  onClick={() => handleRoleSelect("user")}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg rounded-lg transition"
                >
                  Customer Login
                </Button>
                <Button
                  onClick={() => handleRoleSelect("chef")}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 text-lg rounded-lg transition"
                >
                  Chef Login
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">MEC Canteen</h1>
              <p className="text-sm text-muted-foreground mb-2">{userType === "user" ? "Customer" : "Chef"} Portal</p>
              <button onClick={handleBackToRole} className="text-sm text-primary hover:underline font-semibold">
                Switch Role
              </button>
            </div>

            {screen === "login" ? (
              <>
                <LoginForm userType={userType!} />
                <p className="text-center text-muted-foreground mt-6 text-sm">
                  Don't have an account?{" "}
                  <button onClick={handleSwitchToSignup} className="text-primary font-semibold hover:underline">
                    Sign up
                  </button>
                </p>
              </>
            ) : (
              <>
                <SignupForm userType={userType!} />
                <p className="text-center text-muted-foreground mt-6 text-sm">
                  Already have an account?{" "}
                  <button onClick={handleSwitchToLogin} className="text-primary font-semibold hover:underline">
                    Login
                  </button>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
