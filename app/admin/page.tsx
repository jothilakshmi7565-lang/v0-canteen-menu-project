"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

type OrderStatus = "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered"

interface Order {
  id: string
  items: Array<{ name: string; quantity: number; price: number }>
  customer: string
  phone: string
  address: string
  status: OrderStatus
  total: number
  timestamp: string
  preparationTime?: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<OrderStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "amount" | "status">("recent")
  const [showStats, setShowStats] = useState(true)

  const mockOrders: Order[] = [
    {
      id: "MCE-1001",
      items: [
        { name: "Idli", quantity: 2, price: 50 },
        { name: "Dosa", quantity: 1, price: 60 },
      ],
      customer: "John Doe",
      phone: "9876543210",
      address: "Room 101, Hostel A",
      status: "delivered",
      total: 220,
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      preparationTime: 20,
    },
    {
      id: "MCE-1002",
      items: [{ name: "Chicken Biryani", quantity: 1, price: 150 }],
      customer: "Jane Smith",
      phone: "9876543211",
      address: "Room 205, Hostel B",
      status: "ready",
      total: 180,
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      preparationTime: 30,
    },
    {
      id: "MCE-1003",
      items: [{ name: "Pongal", quantity: 3, price: 55 }],
      customer: "Alex Kumar",
      phone: "9876543212",
      address: "Room 310, Hostel C",
      status: "preparing",
      total: 195,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      preparationTime: 25,
    },
    {
      id: "MCE-1004",
      items: [
        { name: "Masala Dosa", quantity: 2, price: 80 },
        { name: "Sambhar", quantity: 1, price: 20 },
      ],
      customer: "Priya Singh",
      phone: "9876543213",
      address: "Room 401, Hostel D",
      status: "confirmed",
      total: 260,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      preparationTime: 35,
    },
    {
      id: "MCE-1005",
      items: [{ name: "Veg Biryani", quantity: 1, price: 120 }],
      customer: "Ravi Patel",
      phone: "9876543214",
      address: "Room 150, Hostel A",
      status: "out_for_delivery",
      total: 150,
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      preparationTime: 28,
    },
  ]

  useEffect(() => {
    setOrders(mockOrders)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === "admin123") {
      setAuthenticated(true)
      setIsAdmin(true)
    } else {
      alert("Invalid admin password")
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setSelectedOrder(null)
  }

  const filteredOrders = orders
    .filter((order) => filter === "all" || order.status === filter)
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      if (sortBy === "amount") return b.total - a.total
      return 0
    })

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "confirmed").length,
    inProgress: orders.filter((o) => o.status === "preparing" || o.status === "ready").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    avgOrderValue: Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length),
    statusBreakdown: [
      { name: "Confirmed", value: orders.filter((o) => o.status === "confirmed").length },
      { name: "Preparing", value: orders.filter((o) => o.status === "preparing").length },
      { name: "Ready", value: orders.filter((o) => o.status === "ready").length },
      { name: "Out for Delivery", value: orders.filter((o) => o.status === "out_for_delivery").length },
      { name: "Delivered", value: orders.filter((o) => o.status === "delivered").length },
    ],
  }

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#a855f7", "#6366f1"]

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      confirmed: "bg-yellow-100 text-yellow-800",
      preparing: "bg-blue-100 text-blue-800",
      ready: "bg-green-100 text-green-800",
      out_for_delivery: "bg-purple-100 text-purple-800",
      delivered: "bg-gray-100 text-gray-800",
    }
    return colors[status]
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center text-primary">Admin Portal</h1>
          <p className="text-center text-muted-foreground text-sm mb-6">MCE Canteen Management</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Admin Password</label>
              <Input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2"
            >
              Login to Dashboard
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4 p-3 bg-muted rounded">
            Demo: <span className="font-mono">admin123</span>
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-90">Order Management System</p>
          </div>
          <Button
            onClick={() => {
              setAuthenticated(false)
              setAdminPassword("")
            }}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalOrders}</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingOrders}</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">In Progress</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.inProgress}</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">Delivered</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">₹{stats.totalRevenue}</p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
              <p className="text-muted-foreground text-sm font-medium mb-1">Avg Order</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{stats.avgOrderValue}</p>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.statusBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.statusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Search Order</label>
              <Input
                placeholder="Order ID or Customer Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Filter by Status</label>
              <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
                <option value="all">All Orders</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Sort by</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <option value="recent">Most Recent</option>
                <option value="amount">Highest Amount</option>
                <option value="status">Status</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setShowStats(!showStats)} variant="outline" className="w-full">
                {showStats ? "Hide Stats" : "Show Stats"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Orders ({filteredOrders.length})</h2>
          </div>
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="p-6 hover:shadow-lg transition cursor-pointer border"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-lg text-foreground">{order.id}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {order.customer} • {order.phone} • {order.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary mb-1">₹{order.total}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className="max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedOrder.id}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(selectedOrder.timestamp).toLocaleString()}
                </p>
              </div>
              <Badge className={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                <p className="font-semibold text-foreground text-lg">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <p className="font-semibold text-foreground text-lg">{selectedOrder.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                <p className="font-semibold text-foreground">{selectedOrder.address}</p>
              </div>
            </div>

            <div className="mb-8 border-t pt-6">
              <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {["confirmed", "preparing", "ready", "out_for_delivery", "delivered"].map((s) => (
                <Button
                  key={s}
                  onClick={() => updateOrderStatus(selectedOrder.id, s as OrderStatus)}
                  disabled={selectedOrder.status === s}
                  className={`py-2 rounded-lg font-semibold transition ${
                    selectedOrder.status === s
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {s.replace("_", " ")}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg font-semibold"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
