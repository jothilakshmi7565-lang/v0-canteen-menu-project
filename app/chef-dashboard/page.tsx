"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, CheckCircle, Clock } from "lucide-react"

export default function ChefDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [orders, setOrders] = useState<
    Array<{ id: string; items: string; customer: string; status: string; time: string }>
  >([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; time: string }>>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userType = localStorage.getItem("userType")
    const token = localStorage.getItem("token")

    if (!userData || !token || userType !== "chef") {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Load orders from localStorage
    const savedOrders = localStorage.getItem("allOrders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }

    // Load notifications
    const savedNotifications = localStorage.getItem("chefNotifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [router])

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders))

    const notification = {
      id: Date.now().toString(),
      message: `Order ${orderId} status updated to ${newStatus}`,
      time: new Date().toLocaleTimeString(),
    }
    setNotifications((prev) => [notification, ...prev])
    localStorage.setItem("chefNotifications", JSON.stringify([notification, ...notifications]))
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const preparingOrders = orders.filter((o) => o.status === "preparing")
  const readyOrders = orders.filter((o) => o.status === "ready")

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chef Dashboard</h1>
            <p className="text-sm opacity-90">Welcome, Chef {user?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-white/20 transition"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-foreground rounded-lg shadow-lg p-4 max-h-64 overflow-y-auto">
                  <h3 className="font-bold mb-3">Recent Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-2 rounded text-sm bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                      >
                        {notif.message} at {notif.time}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleLogout} className="bg-white text-blue-600 hover:bg-opacity-90">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparing</p>
                <p className="text-3xl font-bold text-blue-600">{preparingOrders.length}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-100 to-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready Orders</p>
                <p className="text-3xl font-bold text-green-600">{readyOrders.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {pendingOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
              <div className="space-y-3">
                {pendingOrders.map((order) => (
                  <Card key={order.id} className="p-4 border-l-4 border-yellow-500">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                        <p className="text-sm mt-1">{order.items}</p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(order.id, "preparing")}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Start Preparing
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {preparingOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Preparing</h2>
              <div className="space-y-3">
                {preparingOrders.map((order) => (
                  <Card key={order.id} className="p-4 border-l-4 border-blue-500">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                        <p className="text-sm mt-1">{order.items}</p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(order.id, "ready")}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Mark Ready
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {readyOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Ready for Pickup</h2>
              <div className="space-y-3">
                {readyOrders.map((order) => (
                  <Card key={order.id} className="p-4 border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                        <p className="text-sm mt-1">{order.items}</p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(order.id, "out-for-delivery")}
                        className="bg-purple-500 hover:bg-purple-600"
                      >
                        Out for Delivery
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
