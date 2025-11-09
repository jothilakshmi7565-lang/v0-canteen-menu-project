"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  image?: string
  color?: string
}

interface MenuItemProps {
  item: MenuItem
  onAddToCart: () => void
  isInCart: boolean
}

export function MenuItem({ item, onAddToCart, isInCart }: MenuItemProps) {
  const imageUrl =
    item.image || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name + " food")}`

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 h-full flex flex-col">
      <div
        className={`relative h-48 ${item.color || "bg-gradient-to-br from-orange-300 to-yellow-200"} flex items-center justify-center overflow-hidden`}
      >
        <img src={imageUrl || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 flex-grow">{item.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary">₹{item.price}</span>
          <Button
            onClick={onAddToCart}
            className={`${
              isInCart ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
            } text-primary-foreground`}
          >
            {isInCart ? "Added" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
