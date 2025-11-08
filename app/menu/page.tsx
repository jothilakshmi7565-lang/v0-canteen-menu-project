"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MenuItem } from "@/components/menu/menu-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"

export default function MenuPage() {
  const router = useRouter()
  const [category, setCategory] = useState<"veg" | "nonveg">("veg")
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (!userData || !token) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const menuItems = {
    veg: [
      { id: "1", name: "Idli", price: 50, description: "Steamed rice cakes with sambhar" },
      { id: "2", name: "Dosa", price: 60, description: "Crispy fermented rice crepes" },
      { id: "3", name: "Pongal", price: 55, description: "Sweet rice and lentil dish" },
    ],
    nonveg: [
      { id: "4", name: "Chicken Biryani", price: 150, description: "Fragrant rice with chicken" },
      { id: "5", name: "Chicken Meals", price: 120, description: "Complete meal with chicken" },
    ],
  }

  const handleAddToCart = (item: (typeof menuItems.veg)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) =>
      prev.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c)).filter((c) => c.quantity > 0),
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MCE Canteen</h1>
            <p className="text-sm opacity-90">Welcome, {user?.username}</p>
          </div>
          <Button onClick={handleLogout} className="bg-primary-foreground text-primary hover:bg-opacity-90">
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={() => setCategory("veg")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  category === "veg"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Vegetarian
              </Button>
              <Button
                onClick={() => setCategory("nonveg")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  category === "nonveg"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Non-Vegetarian
              </Button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems[category].map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={() => handleAddToCart(item)}
                  isInCart={cart.some((c) => c.id === item.id)}
                />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary cart={cart} onRemoveItem={handleRemoveFromCart} onCheckout={() => router.push("/checkout")} />
          </div>
        </div>
      </div>
    </div>
  )
}
