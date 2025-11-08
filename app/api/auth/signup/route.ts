import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in production, use a real database
const users: { [key: string]: { password: string; username: string } } = {
  testuser: { password: "password123", username: "testuser" },
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    if (users[username]) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 })
    }

    users[username] = { password, username }

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
