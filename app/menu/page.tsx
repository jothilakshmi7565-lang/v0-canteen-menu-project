"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MenuItem } from "@/components/menu/menu-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function MenuPage() {
  const router = useRouter()
  const [category, setCategory] = useState<"veg" | "nonveg" | "snacks" | "desserts">("veg")
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: "chef" | "ready" }>>([])
  const [showNotifications, setShowNotifications] = useState(false)

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
        image: "/idli-steamed-rice-cakes-south-indian.jpg",
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
        image: "/medu-vada-fried-lentil-donuts.jpg",
      },
      {
        id: "8",
        name: "Chikhalali",
        price: 45,
        description: "Rava fried crispy snack",
        color: "bg-gradient-to-br from-yellow-200 to-amber-200",
        image: "/chikhalali-rava-crispy-snack.jpg",
      },
      {
        id: "9",
        name: "Vegetable Biryani",
        price: 100,
        description: "Fragrant rice with mixed vegetables",
        color: "bg-gradient-to-br from-green-200 to-emerald-300",
        image: "/vegetable-biryani-fragrant-rice.jpg",
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
        image: "/fish-fry-spicy-coconut.jpg",
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
        image: "/egg-biryani-rice-eggs.jpg",
      },
      {
        id: "16",
        name: "Chicken Curry Rice",
        price: 100,
        description: "Rice with spicy chicken curry",
        color: "bg-gradient-to-br from-red-200 to-orange-400",
        image: "/chicken-curry-rice.jpg",
      },
    ],
    snacks: [
      {
        id: "17",
        name: "Samosa",
        price: 25,
        description: "Crispy potato and pea pastry",
        color: "bg-gradient-to-br from-amber-300 to-yellow-400",
        image: "/samosa-crispy-pastry-golden.jpg",
      },
      {
        id: "18",
        name: "Puff",
        price: 20,
        description: "Crispy puff pastry snack",
        color: "bg-gradient-to-br from-orange-300 to-amber-300",
        image: "/puff-crispy-pastry-snack.jpg",
      },
      {
        id: "19",
        name: "Pakora",
        price: 30,
        description: "Crispy vegetable fritters",
        color: "bg-gradient-to-br from-yellow-400 to-orange-300",
        image: "/pakora-crispy-vegetable-fritters.jpg",
      },
      {
        id: "20",
        name: "Murukku",
        price: 35,
        description: "Spiral shaped savory snack",
        color: "bg-gradient-to-br from-yellow-300 to-amber-300",
        image: "/murukku-spiral-savory-snack.jpg",
      },
      {
        id: "21",
        name: "Mixture",
        price: 40,
        description: "Spicy mixed savory snack",
        color: "bg-gradient-to-br from-orange-300 to-yellow-300",
        image: "/mixture-spicy-savory-snack.jpg",
      },
      {
        id: "22",
        name: "Chikki",
        price: 30,
        description: "Brittle peanut candy",
        color: "bg-gradient-to-br from-yellow-400 to-yellow-300",
        image: "/chikki-peanut-brittle-candy.jpg",
      },
      {
        id: "23",
        name: "Chips",
        price: 20,
        description: "Crispy potato chips",
        color: "bg-gradient-to-br from-yellow-300 to-orange-300",
        image: "/chips-crispy-potato.jpg",
      },
      {
        id: "24",
        name: "Pickle",
        price: 15,
        description: "Traditional Indian pickle",
        color: "bg-gradient-to-br from-green-400 to-yellow-400",
        image: "/pickle-traditional-indian.jpg",
      },
    ],
    desserts: [
      {
        id: "25",
        name: "Gulab Jamun",
        price: 50,
        description: "Sweet milk solids in sugar syrup",
        color: "bg-gradient-to-br from-red-300 to-pink-300",
        image: "/gulab-jamun-sweet-milk-syrup.jpg",
      },
      {
        id: "26",
        name: "Jalebi",
        price: 40,
        description: "Crispy sweet spiral",
        color: "bg-gradient-to-br from-yellow-400 to-orange-400",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "27",
        name: "Kheer",
        price: 45,
        description: "Creamy rice pudding",
        color: "bg-gradient-to-br from-yellow-200 to-orange-200",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "28",
        name: "Payasam",
        price: 55,
        description: "Sweet vermicelli pudding",
        color: "bg-gradient-to-br from-orange-200 to-yellow-200",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "29",
        name: "Mango Juice",
        price: 35,
        description: "Fresh mango juice",
        color: "bg-gradient-to-br from-yellow-400 to-orange-500",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "30",
        name: "Orange Juice",
        price: 30,
        description: "Fresh orange juice",
        color: "bg-gradient-to-br from-orange-400 to-orange-500",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "31",
        name: "Coconut Water",
        price: 25,
        description: "Fresh coconut water",
        color: "bg-gradient-to-br from-cyan-200 to-blue-200",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "32",
        name: "Lassi",
        price: 40,
        description: "Yogurt-based drink",
        color: "bg-gradient-to-br from-yellow-100 to-orange-100",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  }

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    const chefNotification = {
      id: Date.now().toString(),
      message: `New order: ${item.name} from ${user?.username}`,
      type: "chef" as const,
    }
    setNotifications((prev) => [chefNotification, ...prev])
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) =>
      prev.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c)).filter((c) => c.quantity > 0),
    )
  }

  const handleCheckout = () => {
    const readyNotification = {
      id: Date.now().toString(),
      message: "Your order has been confirmed! Chef is preparing your meal.",
      type: "ready" as const,
    }
    setNotifications((prev) => [readyNotification, ...prev])
    router.push("/checkout")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MEC Canteen</h1>
            <p className="text-sm opacity-90">Welcome, {user?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-primary-foreground/20 transition"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-foreground rounded-lg shadow-lg p-4 max-h-64 overflow-y-auto">
                  <h3 className="font-bold mb-3">Recent Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2 rounded text-sm ${
                          notif.type === "chef"
                            ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                            : "bg-green-100 text-green-800 border-l-4 border-green-500"
                        }`}
                      >
                        {notif.type === "chef" ? "👨‍🍳 Chef:" : "✅ Ready:"} {notif.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleLogout} className="bg-primary-foreground text-primary hover:bg-opacity-90">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-8 flex-wrap">
              {(["veg", "nonveg", "snacks", "desserts"] as const).map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-3 rounded-lg font-semibold transition capitalize ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat === "nonveg" ? "Non-Veg" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>

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

          <div className="lg:col-span-1">
            <CartSummary cart={cart} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  )
}
