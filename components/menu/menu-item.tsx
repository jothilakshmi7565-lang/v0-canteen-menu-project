"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MenuItem {
  id: string
  name: string
  price: number
  description: string
}

interface MenuItemProps {
  item: MenuItem
  onAddToCart: () => void
  isInCart: boolean
}

export function MenuItem({ item, onAddToCart, isInCart }: MenuItemProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">₹{item.price}</span>
        <Button onClick={onAddToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}
