"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [deliveryDetails, setDeliveryDetails] = useState({
    phone: "",
    address: "",
    specialInstructions: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const cartData = localStorage.getItem("cart")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
    if (cartData) {
      setCart(JSON.parse(cartData))
    }
  }, [router])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodSelection = (method: string) => {
    localStorage.setItem("paymentMethod", method)
    localStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails))
    router.push(`/payment/${method}`)
  }

  const isFormValid = deliveryDetails.phone && deliveryDetails.address

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button onClick={() => router.back()} className="bg-primary-foreground text-primary hover:bg-opacity-90">
            Back
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={deliveryDetails.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
                  <textarea
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                    placeholder="Enter your delivery address"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={deliveryDetails.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="e.g., No onions, Extra spicy, etc."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Select Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "upi", name: "UPI", icon: "💳" },
                  { id: "phonepe", name: "PhonePe", icon: "📱" },
                  { id: "googlepay", name: "Google Pay", icon: "🔵" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelection(method.id)}
                    disabled={!isFormValid}
                    className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-muted transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-semibold text-foreground">{method.name}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-foreground">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between pb-2 border-b border-border">
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground">Subtotal:</span>
                  <span className="font-semibold text-foreground">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Delivery Fee:</span>
                  <span className="font-semibold text-foreground">₹30</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">₹{total + 30}</span>
                </div>
              </div>

              {!isFormValid && (
                <p className="text-xs text-destructive mt-4 text-center">Please fill all delivery details</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
