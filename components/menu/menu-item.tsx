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
  originalPrice?: number
  discount?: string
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
        className={`relative h-48 ${item.color || "bg-linear-to-br from-orange-300 to-yellow-200"} flex items-center justify-center overflow-hidden`}
      >
        <img src={imageUrl || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
        {item.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.discount}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 flex-grow">{item.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
            )}
          </div>
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