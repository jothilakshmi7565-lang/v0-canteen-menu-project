import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in production, use a real database
const users: { [key: string]: { password: string; username: string; userType: "user" | "chef" } } = {
  testuser: { password: "password123", username: "testuser", userType: "user" },
  chef123: { password: "pass123", username: "chef123", userType: "chef" },
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, userType } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    // Special handling for admin
    if (userType === "admin") {
      if (username === "admin" && password === "admin123") {
        const token = Buffer.from(`admin:${Date.now()}`).toString("base64")
        return NextResponse.json({
          success: true,
          token,
          user: { username: "admin", id: "admin" },
        })
      } else {
        return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
      }
    }

    const user = users[username]
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Check if the user type matches
    if (user.userType !== userType) {
      return NextResponse.json({ message: `User is not registered as a ${userType}` }, { status: 401 })
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: { username, id: username },
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}