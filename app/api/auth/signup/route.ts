import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in production, use a real database
const users: { [key: string]: { password: string; username: string; userType: "user" | "chef" } } = {
  testuser: { password: "password123", username: "testuser", userType: "user" },
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, userType } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    // Admins cannot be created through signup
    if (userType === "admin") {
      return NextResponse.json({ message: "Admin accounts cannot be created through signup" }, { status: 400 })
    }

    if (users[username]) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 })
    }

    users[username] = { password, username, userType }

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