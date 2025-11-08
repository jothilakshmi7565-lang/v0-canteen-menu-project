"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [orders, setOrders] = useState<Array<{ id: string; date: string; amount: number; status: string }>>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Simulate fetching orders
    const mockOrders = [
      { id: "MCE-1234567890", date: "2 hours ago", amount: 245, status: "Delivered" },
      { id: "MCE-1234567891", date: "Yesterday", amount: 320, status: "Delivered" },
    ]
    setOrders(mockOrders)
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Button
            onClick={() => router.push("/menu")}
            className="bg-primary-foreground text-primary hover:bg-opacity-90"
          >
            Order Again
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Button
              onClick={() => router.push("/menu")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Ordering
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{order.amount}</p>
                    <p className="text-sm font-semibold text-foreground">{order.status}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
