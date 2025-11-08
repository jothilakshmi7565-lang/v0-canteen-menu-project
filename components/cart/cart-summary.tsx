"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartSummaryProps {
  cart: CartItem[]
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
}

export function CartSummary({ cart, onRemoveItem, onCheckout }: CartSummaryProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card className="p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4 text-foreground">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-2 border-b border-border">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                  <Button
                    onClick={() => onRemoveItem(item.id)}
                    className="bg-destructive hover:bg-destructive/90 text-primary-foreground px-2 py-1 text-sm"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Items:</span>
              <span className="font-bold text-foreground">{itemCount}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-foreground">Total:</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition"
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Card>
  )
}
