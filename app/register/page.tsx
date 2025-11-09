"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/auth/signup-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"user" | "chef">("user")

  const handleBackToLogin = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-400 via-yellow-50 to-blue-400 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-orange-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-yellow-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-linear-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div>
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-block p-4 bg-linear-to-br from-orange-400 to-red-400 rounded-full mb-4">
                <h1 className="text-5xl font-black text-white">🍲</h1>
              </div>
              <h1 className="text-5xl font-black bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                MEC Canteen
              </h1>
              <p className="text-lg text-orange-800 font-semibold">South Indian Delights at Your Doorstep</p>
            </div>

            <Card className="p-8 border-0 shadow-2xl bg-white/95 backdrop-blur">
              <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Create Account
              </h2>

              {/* User Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-orange-800 mb-3">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setUserType("user")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userType === "user"
                        ? "border-orange-500 bg-orange-50 text-orange-700 font-bold shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-orange-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">👤</span>
                      <span>Customer</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setUserType("chef")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userType === "chef"
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">👨‍🍳</span>
                      <span>Canteen Staff</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <SignupForm userType={userType} />

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={handleBackToLogin}
                    className="text-orange-600 font-bold hover:underline transition"
                  >
                    Login
                  </button>
                </p>
              </div>
            </Card>

            <p className="text-center text-sm text-orange-700 mt-6 font-semibold">
              Demo: testuser/password123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}