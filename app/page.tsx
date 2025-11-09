"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [screen, setScreen] = useState<"role" | "login" | "signup">("role")
  const [userType, setUserType] = useState<"user" | "chef" | null>(null)
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: "order" | "ready" }>>(
    [],
  )
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {screen === "role" ? (
            <div>
              <div className="text-center mb-8 animate-fade-in">
                <div className="inline-block p-4 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-4">
                  <h1 className="text-5xl font-black text-white">🍲</h1>
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  MEC Canteen
                </h1>
                <p className="text-lg text-orange-800 font-semibold">South Indian Delights at Your Doorstep</p>
              </div>

              <Card className="p-8 border-0 shadow-2xl bg-white/95 backdrop-blur">
                <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Select Your Role
                </h2>
                <p className="text-center text-muted-foreground mb-8 text-sm">
                  Choose how you want to access MEC Canteen
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => handleRoleSelect("user")}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 text-lg rounded-xl transition transform hover:scale-105 hover:shadow-lg"
                  >
                    👤 Customer Login
                  </Button>
                  <Button
                    onClick={() => handleRoleSelect("chef")}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 text-lg rounded-xl transition transform hover:scale-105 hover:shadow-lg"
                  >
                    👨‍🍳 Chef Login
                  </Button>
                </div>
              </Card>

              <p className="text-center text-sm text-orange-700 mt-6 font-semibold">
                Demo: user123/pass123 or chef123/pass123
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  MEC Canteen
                </h1>
                <p className="text-sm text-orange-700 font-semibold mb-3">
                  {userType === "user" ? "👤 Customer Portal" : "👨‍🍳 Chef Portal"}
                </p>
                <button
                  onClick={handleBackToRole}
                  className="text-orange-600 hover:text-orange-800 font-bold text-sm hover:underline transition"
                >
                  ← Switch Role
                </button>
              </div>

              {screen === "login" ? (
                <>
                  <LoginForm userType={userType!} />
                  <p className="text-center text-muted-foreground mt-6 text-sm">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSwitchToSignup}
                      className="text-orange-600 font-bold hover:underline transition"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <SignupForm userType={userType!} />
                  <p className="text-center text-muted-foreground mt-6 text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={handleSwitchToLogin}
                      className="text-orange-600 font-bold hover:underline transition"
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
