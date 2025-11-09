"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  userType: "user" | "chef" | "admin"
}

export function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Special handling for admin login
      if (userType === "admin") {
        // For admin, we check a specific password
        if (username === "admin" && password === "admin123") {
          localStorage.setItem("user", JSON.stringify({ username: "admin", id: "admin" }))
          localStorage.setItem("token", "admin-token")
          localStorage.setItem("userType", "admin")
          router.push("/admin")
          return
        } else {
          throw new Error("Invalid admin credentials")
        }
      }

      // Regular user/chef login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userType }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Login failed")
      }

      const data = await response.json()
      localStorage.setItem("user", JSON.stringify({ ...data.user, userType }))
      localStorage.setItem("token", data.token)
      localStorage.setItem("userType", userType)

      // Redirect based on user type
      if (userType === "chef") {
        router.push("/chef-dashboard")
      } else {
        router.push("/menu")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 border-0 shadow-2xl bg-white/95 backdrop-blur">
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-orange-800 mb-3">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={userType === "admin" ? "Enter admin username" : "Enter your username"}
            className="w-full px-4 py-3 rounded-lg border-2 border-orange-200 bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-orange-800 mb-3">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={userType === "admin" ? "Enter admin password" : "Enter your password"}
              className="w-full px-4 py-3 rounded-lg border-2 border-orange-200 bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800 transition font-semibold flex items-center gap-1"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <>
                  <EyeOff size={20} /> Hide
                </>
              ) : (
                <>
                  <Eye size={20} /> Show
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-100 border-2 border-red-300 text-red-700 text-sm font-semibold animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          {loading ? "Logging in..." : `Login as ${userType === "chef" ? "Canteen Staff" : userType === "admin" ? "Admin" : "Customer"}`}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          Demo: <span className="font-semibold">testuser/password123</span> or{" "}
          <span className="font-semibold">chef123/pass123</span>
          {userType === "admin" && (
            <> or <span className="font-semibold">admin/admin123</span></>
          )}
        </p>
      </form>
    </Card>
  )
}