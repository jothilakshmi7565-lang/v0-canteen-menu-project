"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const method = params.method as string
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"pending" | "processing" | "success" | "failed">("pending")
  const [orderId, setOrderId] = useState("")

  const methodDetails = {
    upi: { name: "UPI", upiId: "meccanteen@upi" },
    phonepe: { name: "PhonePe", phone: "9000000000" },
    googlepay: { name: "Google Pay", email: "pay@meccanteen.com" },
  }

  const current = methodDetails[method as keyof typeof methodDetails] || methodDetails.upi

  const handlePayment = async () => {
    setLoading(true)
    setStatus("processing")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newOrderId = `MEC-${Date.now()}`
      setOrderId(newOrderId)
      setStatus("success")

      // Save order to localStorage
      const order = {
        orderId: newOrderId,
        timestamp: new Date().toISOString(),
        paymentMethod: method,
        amount:
          JSON.parse(localStorage.getItem("cart") || "[]").reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
          ) + 30,
      }
      localStorage.setItem("lastOrder", JSON.stringify(order))
    } catch (error) {
      setStatus("failed")
    } finally {
      setLoading(false)
    }
  }

  const handleOrderTracking = () => {
    router.push(`/orders/${orderId}`)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">Payment Confirmation</h1>

        {status === "pending" && (
          <>
            <div className="bg-muted p-4 rounded-lg mb-6 text-center">
              <p className="text-foreground font-semibold mb-2">{current.name} Payment</p>
              <p className="text-sm text-muted-foreground mb-4">
                {method === "upi" && `Pay to: ${current.upiId}`}
                {method === "phonepe" && `PhonePe: ${current.phone}`}
                {method === "googlepay" && `Google Pay: ${current.email}`}
              </p>
              <p className="text-2xl font-bold text-primary">
                ₹
                {JSON.parse(localStorage.getItem("cart") || "[]").reduce(
                  (sum: number, item: any) => sum + item.price * item.quantity,
                  0,
                ) + 30}
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg mb-4"
            >
              {loading ? "Processing Payment..." : `Pay with ${current.name}`}
            </Button>

            <Button
              onClick={() => router.back()}
              className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 rounded-lg"
            >
              Go Back
            </Button>
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin mb-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
            <p className="text-foreground font-semibold">Processing your payment...</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-foreground font-bold mb-2">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mb-4">Your order has been placed</p>
              <p className="text-lg font-bold text-primary">{orderId}</p>
            </div>

            <Button
              onClick={handleOrderTracking}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg"
            >
              Track Your Order
            </Button>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">✕</span>
              </div>
              <p className="text-foreground font-bold">Payment Failed</p>
              <p className="text-sm text-muted-foreground mt-2">Please try again</p>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg mb-4"
            >
              Retry Payment
            </Button>

            <Button
              onClick={() => router.back()}
              className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 rounded-lg"
            >
              Go Back
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
