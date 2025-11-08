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
      {
        id: "1",
        name: "Idli",
        price: 50,
        description: "Steamed rice cakes with sambhar",
        color: "bg-gradient-to-br from-yellow-100 to-orange-100",
        image: "/idli-south-indian-steamed-rice-cakes.jpg",
      },
      {
        id: "2",
        name: "Dosa",
        price: 60,
        description: "Crispy fermented rice crepes",
        color: "bg-gradient-to-br from-amber-200 to-yellow-200",
        image: "/dosa-crispy-rice-crepes.jpg",
      },
      {
        id: "3",
        name: "Pongal",
        price: 55,
        description: "Sweet rice and lentil dish",
        color: "bg-gradient-to-br from-red-200 to-orange-300",
        image: "/pongal-sweet-rice-lentil.jpg",
      },
      {
        id: "6",
        name: "Uttapam",
        price: 65,
        description: "Thick rice pancake with veggies",
        color: "bg-gradient-to-br from-yellow-300 to-orange-200",
        image: "/uttapam-thick-rice-pancake.jpg",
      },
      {
        id: "7",
        name: "Medu Vada",
        price: 40,
        description: "Soft fried lentil donuts",
        color: "bg-gradient-to-br from-orange-300 to-amber-200",
        image: "/medu-vada-fried-lentil.jpg",
      },
      {
        id: "8",
        name: "Chikhalali",
        price: 45,
        description: "Rava fried crispy snack",
        color: "bg-gradient-to-br from-yellow-200 to-amber-200",
        image: "/chikhalali-crispy-snack.jpg",
      },
      {
        id: "9",
        name: "Vegetable Biryani",
        price: 100,
        description: "Fragrant rice with mixed vegetables",
        color: "bg-gradient-to-br from-green-200 to-emerald-300",
        image: "/vegetable-biryani-rice.jpg",
      },
      {
        id: "10",
        name: "Sambar Rice",
        price: 55,
        description: "Rice mixed with lentil curry",
        color: "bg-gradient-to-br from-yellow-100 to-orange-200",
        image: "/sambar-rice-lentil-curry.jpg",
      },
    ],
    nonveg: [
      {
        id: "4",
        name: "Chicken Biryani",
        price: 150,
        description: "Fragrant rice with tender chicken",
        color: "bg-gradient-to-br from-red-300 to-orange-400",
        image: "/chicken-biryani-fragrant-rice.jpg",
      },
      {
        id: "5",
        name: "Chicken Meals",
        price: 120,
        description: "Complete meal with grilled chicken",
        color: "bg-gradient-to-br from-amber-300 to-yellow-300",
        image: "/chicken-meals-grilled.jpg",
      },
      {
        id: "11",
        name: "Chicken Dosa",
        price: 90,
        description: "Crispy dosa stuffed with chicken",
        color: "bg-gradient-to-br from-orange-200 to-amber-300",
        image: "/chicken-dosa-crispy.jpg",
      },
      {
        id: "12",
        name: "Mutton Biryani",
        price: 180,
        description: "Fragrant rice with tender mutton",
        color: "bg-gradient-to-br from-red-400 to-orange-500",
        image: "/mutton-biryani-fragrant.jpg",
      },
      {
        id: "13",
        name: "Fish Fry",
        price: 130,
        description: "Spicy fried fish with coconut",
        color: "bg-gradient-to-br from-yellow-400 to-orange-300",
        image: "/fish-fry-spicy.jpg",
      },
      {
        id: "14",
        name: "Chicken Tikka",
        price: 110,
        description: "Marinated and grilled chicken pieces",
        color: "bg-gradient-to-br from-red-300 to-amber-200",
        image: "/chicken-tikka-grilled.jpg",
      },
      {
        id: "15",
        name: "Egg Biryani",
        price: 80,
        description: "Rice with boiled eggs",
        color: "bg-gradient-to-br from-yellow-300 to-orange-300",
        image: "/egg-biryani-rice.jpg",
      },
      {
        id: "16",
        name: "Chicken Curry Rice",
        price: 100,
        description: "Rice with spicy chicken curry",
        color: "bg-gradient-to-br from-red-200 to-orange-400",
        image: "/placeholder.svg?height=200&width=200",
      },
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
            <h1 className="text-2xl font-bold">MEC Canteen</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
