"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, CheckCircle, Clock } from "lucide-react"
import { useNotifications } from "@/lib/notification-context"

export default function ChefDashboard() {
  const router = useRouter()
  const { notifications, clearNotifications } = useNotifications()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [orders, setOrders] = useState<
    Array<{ id: string; items: string; customer: string; status: string; time: string }>
  >([])
  const [showNotifications, setShowNotifications] = useState(false)

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
  }, [router])

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders))

    // Add notification about status update
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      const notification = {
        id: Date.now().toString(),
        message: `Order ${orderId} status updated to ${newStatus}`,
        time: new Date().toLocaleTimeString(),
      }
      // For chef notifications, we'll store them separately
      const chefNotifications = JSON.parse(localStorage.getItem("chefNotifications") || "[]")
      const updatedChefNotifications = [notification, ...chefNotifications]
      localStorage.setItem("chefNotifications", JSON.stringify(updatedChefNotifications))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    localStorage.removeItem("chefNotifications")
    clearNotifications()
    router.push("/")
  }

  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const preparingOrders = orders.filter((o) => o.status === "preparing").length
  const readyOrders = orders.filter((o) => o.status === "ready").length

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-purple-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-linear-to-br from-pink-200 to-transparent rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10">
        <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">👨‍🍳 Chef Dashboard</h1>
              <p className="text-blue-100 text-sm">Welcome, Chef {user?.username || "Chef"}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <Bell size={24} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifications && notifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-foreground rounded-lg shadow-2xl z-20 p-4 border-l-4 border-blue-500">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-blue-600">Chef Notifications</h3>
                      <button 
                        onClick={clearNotifications}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg text-sm border-l-4 border-blue-400"
                        >
                          <p className="font-semibold text-gray-800">{notif.message}</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white font-bold">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-linear-to-br from-red-100 to-orange-100 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-semibold">Pending Orders</p>
                  <p className="text-4xl font-bold text-red-600">{pendingOrders}</p>
                </div>
                <Clock className="text-red-400" size={40} />
              </div>
            </Card>
            <Card className="p-6 bg-linear-to-br from-yellow-100 to-amber-100 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-semibold">Preparing</p>
                  <p className="text-4xl font-bold text-yellow-600">{preparingOrders}</p>
                </div>
                <CheckCircle className="text-yellow-400" size={40} />
              </div>
            </Card>
            <Card className="p-6 bg-linear-to-br from-green-100 to-emerald-100 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-semibold">Ready</p>
                  <p className="text-4xl font-bold text-green-600">{readyOrders}</p>
                </div>
                <CheckCircle className="text-green-400" size={40} />
              </div>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="p-6 bg-white/95 backdrop-blur border-0 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Active Orders
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">📋</p>
                <p className="text-muted-foreground font-medium">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-4 border-l-4 border-blue-400 bg-linear-to-r from-blue-50 to-purple-50 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                        <p className="text-sm mt-1">{order.items}</p>
                      </div>
                      {order.status === "pending" && (
                        <Button
                          onClick={() => handleUpdateStatus(order.id, "preparing")}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Start Preparing
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          onClick={() => handleUpdateStatus(order.id, "ready")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Mark Ready
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Button
                          onClick={() => handleUpdateStatus(order.id, "out-for-delivery")}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          Out for Delivery
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}