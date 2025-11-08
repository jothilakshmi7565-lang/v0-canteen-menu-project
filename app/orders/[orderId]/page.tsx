"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type OrderStatus = "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered"

export default function OrderTrackingPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.orderId as string

  const [status, setStatus] = useState<OrderStatus>("confirmed")
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; time: string }>>([])
  const [estimatedTime, setEstimatedTime] = useState(25)

  useEffect(() => {
    // Simulate order status progression
    const statusProgression: OrderStatus[] = ["confirmed", "preparing", "ready", "out_for_delivery", "delivered"]
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length) {
        const newStatus = statusProgression[currentIndex]
        setStatus(newStatus)

        const statusMessages = {
          confirmed: "Your order has been confirmed!",
          preparing: "Your order is being prepared in the kitchen.",
          ready: "Your order is ready for delivery!",
          out_for_delivery: "Your order is out for delivery.",
          delivered: "Your order has been delivered. Thank you for ordering!",
        }

        setNotifications((prev) => [
          ...prev,
          {
            id: `notif-${Date.now()}`,
            message: statusMessages[newStatus],
            time: new Date().toLocaleTimeString(),
          },
        ])

        currentIndex++
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const statusSteps = [
    { status: "confirmed", label: "Confirmed", time: "Now" },
    { status: "preparing", label: "Preparing", time: "5 min" },
    { status: "ready", label: "Ready", time: "10 min" },
    { status: "out_for_delivery", label: "Out for Delivery", time: "15 min" },
    { status: "delivered", label: "Delivered", time: "25 min" },
  ]

  const getStatusIndex = (s: OrderStatus) => statusSteps.findIndex((step) => step.status === s)
  const currentStatusIndex = getStatusIndex(status)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order Tracking</h1>
          <Button
            onClick={() => router.push("/menu")}
            className="bg-primary-foreground text-primary hover:bg-opacity-90"
          >
            Continue Shopping
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Order ID */}
        <Card className="p-6 mb-6 text-center">
          <p className="text-muted-foreground mb-2">Order ID</p>
          <h2 className="text-3xl font-bold text-primary">{orderId}</h2>
        </Card>

        {/* Status Timeline */}
        <Card className="p-8 mb-6">
          <div className="flex items-center justify-between relative mb-8">
            {/* Progress Bar */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${((currentStatusIndex + 1) / statusSteps.length) * 100}%`,
                }}
              />
            </div>

            {/* Status Steps */}
            <div className="relative z-10 flex justify-between w-full">
              {statusSteps.map((step, index) => (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                      index <= currentStatusIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStatusIndex ? "✓" : index + 1}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground mb-2">Estimated Delivery Time</p>
            <p className="text-3xl font-bold text-primary">{estimatedTime} minutes</p>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 text-foreground">Order Updates</h3>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Waiting for updates...</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 bg-muted rounded-lg border-l-4 border-primary"
                >
                  <span className="text-primary mt-1">●</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{notif.message}</p>
                    <p className="text-sm text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
