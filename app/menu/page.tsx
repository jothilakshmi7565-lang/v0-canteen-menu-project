"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MenuItem } from "@/components/menu/menu-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useNotifications } from "@/lib/notification-context"

export default function MenuPage() {
  const router = useRouter()
  const { notifications, clearNotifications } = useNotifications()
  const [category, setCategory] = useState<"veg" | "nonveg" | "snacks" | "desserts">("veg")
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userType = localStorage.getItem("userType")
    const token = localStorage.getItem("token")

    if (!userData || !token || userType !== "user") {
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
        color: "bg-linear-to-br from-yellow-100 to-orange-100",
        image: "/idli-steamed-rice-cakes-south-indian.jpg",
      },
      {
        id: "2",
        name: "Dosa",
        price: 60,
        description: "Crispy fermented rice crepes",
        color: "bg-linear-to-br from-amber-200 to-yellow-200",
        image: "/dosa-crispy-rice-crepes.jpg",
      },
      {
        id: "3",
        name: "Pongal",
        price: 55,
        description: "Sweet rice and lentil dish",
        color: "bg-linear-to-br from-red-200 to-orange-300",
        image: "/pongal-sweet-rice-lentil.jpg",
      },
      {
        id: "6",
        name: "Uttapam",
        price: 65,
        description: "Thick rice pancake with veggies",
        color: "bg-linear-to-br from-yellow-300 to-orange-200",
        image: "/uttapam-thick-rice-pancake.jpg",
      },
      {
        id: "7",
        name: "Medu Vada",
        price: 40,
        description: "Soft fried lentil donuts",
        color: "bg-linear-to-br from-orange-300 to-amber-200",
        image: "/medu-vada-fried-lentil-donuts.jpg",
      },
      {
        id: "8",
        name: "Chikhalali",
        price: 45,
        description: "Rava fried crispy snack",
        color: "bg-linear-to-br from-yellow-200 to-amber-200",
        image: "/chikhalali-rava-crispy-snack.jpg",
      },
      {
        id: "9",
        name: "Vegetable Biryani",
        price: 100,
        description: "Fragrant rice with mixed vegetables",
        color: "bg-linear-to-br from-green-200 to-emerald-300",
        image: "/vegetable-biryani-fragrant-rice.jpg",
      },
      {
        id: "10",
        name: "Sambar Rice",
        price: 55,
        description: "Rice mixed with lentil curry",
        color: "bg-linear-to-br from-yellow-100 to-orange-200",
        image: "/sambar-rice-lentil-curry.jpg",
      },
      // New vegetarian items
      {
        id: "33",
        name: "Masala Dosa",
        price: 80,
        description: "Crispy dosa with spicy potato filling",
        color: "bg-linear-to-br from-amber-300 to-yellow-300",
        image: "/masala-dosa-spicy-potato.jpg",
      },
      {
        id: "34",
        name: "Rava Idli",
        price: 45,
        description: "Soft semolina steamed cakes",
        color: "bg-linear-to-br from-yellow-200 to-amber-200",
        image: "/rava-idli-semolina.jpg",
      },
      {
        id: "35",
        name: "Vegetable Upma",
        price: 50,
        description: "Savory semolina with vegetables",
        color: "bg-linear-to-br from-orange-200 to-yellow-200",
        image: "/vegetable-upma-semolina.jpg",
      },
      {
        id: "36",
        name: "Paneer Butter Masala",
        price: 120,
        description: "Cottage cheese in rich buttery tomato gravy",
        color: "bg-linear-to-br from-red-200 to-orange-300",
        image: "/paneer-butter-masala.jpg",
      },
    ],
    nonveg: [
      {
        id: "4",
        name: "Chicken Biryani",
        price: 150,
        description: "Fragrant rice with tender chicken",
        color: "bg-linear-to-br from-red-300 to-orange-400",
        image: "/chicken-biryani-fragrant-rice.jpg",
      },
      {
        id: "5",
        name: "Chicken Meals",
        price: 120,
        description: "Complete meal with grilled chicken",
        color: "bg-linear-to-br from-amber-300 to-yellow-300",
        image: "/chicken-meals-grilled.jpg",
      },
      {
        id: "11",
        name: "Chicken Dosa",
        price: 90,
        description: "Crispy dosa stuffed with chicken",
        color: "bg-linear-to-br from-orange-200 to-amber-300",
        image: "/chicken-dosa-crispy.jpg",
      },
      {
        id: "12",
        name: "Mutton Biryani",
        price: 180,
        description: "Fragrant rice with tender mutton",
        color: "bg-linear-to-br from-red-400 to-orange-500",
        image: "/mutton-biryani-fragrant.jpg",
      },
      {
        id: "13",
        name: "Fish Fry",
        price: 130,
        description: "Spicy fried fish with coconut",
        color: "bg-linear-to-br from-yellow-400 to-orange-300",
        image: "/fish-fry-spicy-coconut.jpg",
      },
      {
        id: "14",
        name: "Chicken Tikka",
        price: 110,
        description: "Marinated and grilled chicken pieces",
        color: "bg-linear-to-br from-red-300 to-amber-200",
        image: "/chicken-tikka-grilled.jpg",
      },
      {
        id: "15",
        name: "Egg Biryani",
        price: 80,
        description: "Rice with boiled eggs",
        color: "bg-linear-to-br from-yellow-300 to-orange-300",
        image: "/egg-biryani-rice-eggs.jpg",
      },
      {
        id: "16",
        name: "Chicken Curry Rice",
        price: 100,
        description: "Rice with spicy chicken curry",
        color: "bg-linear-to-br from-red-200 to-orange-400",
        image: "/chicken-curry-rice.jpg",
      },
      // New non-vegetarian items
      {
        id: "37",
        name: "Fish Curry",
        price: 140,
        description: "Spicy fish in coconut-based curry",
        color: "bg-linear-to-br from-orange-300 to-yellow-300",
        image: "/fish-curry-coconut.jpg",
      },
      {
        id: "38",
        name: "Chicken 65",
        price: 125,
        description: "Spicy deep-fried chicken appetizer",
        color: "bg-linear-to-br from-red-400 to-orange-400",
        image: "/chicken-65-fried.jpg",
      },
      {
        id: "39",
        name: "Mutton Curry",
        price: 160,
        description: "Tender mutton in spicy gravy",
        color: "bg-linear-to-br from-red-500 to-orange-500",
        image: "/mutton-curry-spicy.jpg",
      },
      {
        id: "40",
        name: "Prawn Fry",
        price: 150,
        description: "Crispy fried prawns with spices",
        color: "bg-linear-to-br from-orange-400 to-amber-400",
        image: "/prawn-fry-crispy.jpg",
      },
    ],
    snacks: [
      {
        id: "17",
        name: "Samosa",
        price: 25,
        description: "Crispy potato and pea pastry",
        color: "bg-linear-to-br from-amber-300 to-yellow-400",
        image: "/samosa-crispy-pastry-golden.jpg",
      },
      {
        id: "18",
        name: "Puff",
        price: 20,
        description: "Crispy puff pastry snack",
        color: "bg-linear-to-br from-orange-300 to-amber-300",
        image: "/puff-crispy-pastry-snack.jpg",
      },
      {
        id: "19",
        name: "Pakora",
        price: 30,
        description: "Crispy vegetable fritters",
        color: "bg-linear-to-br from-yellow-400 to-orange-300",
        image: "/pakora-crispy-vegetable-fritters.jpg",
      },
      {
        id: "20",
        name: "Murukku",
        price: 35,
        description: "Spiral shaped savory snack",
        color: "bg-linear-to-br from-yellow-300 to-amber-300",
        image: "/murukku-spiral-savory-snack.jpg",
      },
      {
        id: "21",
        name: "Bajji",
        price: 25,
        description: "Spicy fritters with onion/chili",
        color: "bg-linear-to-br from-orange-300 to-yellow-300",
        image: "/bajji-spicy-fritters-onion.jpg",
      },
      {
        id: "22",
        name: "Vada",
        price: 30,
        description: "Crispy lentil fritters",
        color: "bg-linear-to-br from-yellow-400 to-yellow-300",
        image: "/vada-crispy-lentil-fritters.jpg",
      },
      {
        id: "23",
        name: "Bonda",
        price: 35,
        description: "Spiced potato balls in gravy",
        color: "bg-linear-to-br from-yellow-300 to-orange-300",
        image: "/bonda-spiced-potato-balls.jpg",
      },
      {
        id: "24",
        name: "Kachori",
        price: 30,
        description: "Deep fried pastry with filling",
        color: "bg-linear-to-br from-green-400 to-yellow-400",
        image: "/kachori-deep-fried-pastry.jpg",
      },
      // New snack items
      {
        id: "41",
        name: "Chicken Cutlet",
        price: 40,
        description: "Spiced chicken cutlets with breadcrumbs",
        color: "bg-linear-to-br from-amber-400 to-orange-400",
        image: "/chicken-cutlet-spiced.jpg",
      },
      {
        id: "42",
        name: "Fish Finger",
        price: 45,
        description: "Breaded and fried fish fingers",
        color: "bg-linear-to-br from-orange-300 to-yellow-300",
        image: "/fish-finger-breaded.jpg",
      },
      {
        id: "43",
        name: "Paneer Tikka",
        price: 80,
        description: "Grilled cottage cheese with spices",
        color: "bg-linear-to-br from-orange-200 to-red-200",
        image: "/paneer-tikka-grilled.jpg",
      },
      {
        id: "44",
        name: "Spring Rolls",
        price: 35,
        description: "Crispy vegetable spring rolls",
        color: "bg-linear-to-br from-green-300 to-yellow-300",
        image: "/spring-rolls-vegetable.jpg",
      },
    ],
    desserts: [
      {
        id: "25",
        name: "Gulab Jamun",
        price: 40,
        description: "Sweet milk balls in syrup",
        color: "bg-linear-to-br from-red-300 to-pink-300",
        image: "/gulab-jamun-sweet-milk-balls.jpg",
      },
      {
        id: "26",
        name: "Rasgulla",
        price: 35,
        description: "Spongy cottage cheese balls",
        color: "bg-linear-to-br from-pink-300 to-red-300",
        image: "/rasgulla-spongy-cottage-cheese.jpg",
      },
      {
        id: "27",
        name: "Payasam",
        price: 45,
        description: "Sweet rice pudding with nuts",
        color: "bg-linear-to-br from-yellow-300 to-orange-300",
        image: "/payasam-sweet-rice-pudding.jpg",
      },
      {
        id: "28",
        name: "Ladoo",
        price: 30,
        description: "Sweet ball-shaped dessert",
        color: "bg-linear-to-br from-yellow-400 to-orange-400",
        image: "/ladoo-sweet-ball-dessert.jpg",
      },
      {
        id: "29",
        name: "Halwa",
        price: 50,
        description: "Sweet semolina dessert",
        color: "bg-linear-to-br from-orange-400 to-amber-400",
        image: "/halwa-sweet-semolina-dessert.jpg",
      },
      {
        id: "30",
        name: "Kheer",
        price: 40,
        description: "Creamy rice pudding",
        color: "bg-linear-to-br from-amber-300 to-yellow-300",
        image: "/kheer-creamy-rice-pudding.jpg",
      },
      {
        id: "31",
        name: "Jalebi",
        price: 35,
        description: "Crispy sweet pretzel-shaped",
        color: "bg-linear-to-br from-yellow-400 to-orange-300",
        image: "/jalebi-crispy-sweet-pretzel.jpg",
      },
      {
        id: "32",
        name: "Mysore Pak",
        price: 50,
        description: "Rich ghee-based sweet",
        color: "bg-linear-to-br from-yellow-300 to-amber-300",
        image: "/mysore-pak-ghee-sweet.jpg",
      },
      // New dessert items
      {
        id: "45",
        name: "Badam Halwa",
        price: 60,
        description: "Rich almond fudge dessert",
        color: "bg-linear-to-br from-amber-400 to-yellow-400",
        image: "/badam-halwa-almond.jpg",
      },
      {
        id: "46",
        name: "Coconut Barfi",
        price: 35,
        description: "Sweet coconut fudge squares",
        color: "bg-linear-to-br from-white to-yellow-100",
        image: "/coconut-barfi-sweet.jpg",
      },
      {
        id: "47",
        name: "Rasmalai",
        price: 50,
        description: "Soft cheese patties in sweet milk",
        color: "bg-linear-to-br from-pink-200 to-red-200",
        image: "/rasmalai-cheese-milk.jpg",
      },
      {
        id: "48",
        name: "Kulfi",
        price: 40,
        description: "Traditional Indian ice cream",
        color: "bg-linear-to-br from-pink-300 to-purple-300",
        image: "/kulfi-indian-icecream.jpg",
      },
    ],
    // Special and unique items
    special: [
      {
        id: "49",
        name: "Royal Thali",
        price: 200,
        description: "Premium platter with 8 varieties: Dosa, Idli, Vada, Paneer, Biryani, Sweets, Pickle & Papad",
        color: "bg-linear-to-br from-purple-300 to-indigo-400",
        image: "/royal-thali-premium.jpg",
      },
      {
        id: "50",
        name: "Chef's Special Biryani",
        price: 220,
        description: "Signature biryani with exotic spices and premium ingredients",
        color: "bg-linear-to-br from-red-400 to-pink-500",
        image: "/chefs-special-biryani.jpg",
      },
      {
        id: "51",
        name: "Gourmet Dosa Platter",
        price: 180,
        description: "Assorted dosas: Masala, Paneer, Cheese & Butter with chutneys",
        color: "bg-linear-to-br from-amber-300 to-orange-400",
        image: "/gourmet-dosa-platter.jpg",
      },
      {
        id: "52",
        name: "South Indian Feast",
        price: 250,
        description: "Grand combo: Biryani, Curry, Bread, Dessert & Beverages",
        color: "bg-linear-to-br from-yellow-400 to-red-500",
        image: "/south-indian-feast.jpg",
      },
    ],
    // Special offers and combos
    combos: [
      {
        id: "53",
        name: "Breakfast Combo",
        price: 85,
        originalPrice: 110,
        description: "Idli (2 pcs) + Dosa + Vada + Chutney + Coffee - Save ₹25!",
        color: "bg-linear-to-br from-green-300 to-emerald-400",
        image: "/breakfast-combo.jpg",
        discount: "23% OFF",
      },
      {
        id: "54",
        name: "Lunch Special",
        price: 130,
        originalPrice: 170,
        description: "Veg Biryani + Paneer Curry + Raita + Dessert - Save ₹40!",
        color: "bg-linear-to-br from-orange-300 to-red-400",
        image: "/lunch-special-combo.jpg",
        discount: "24% OFF",
      },
      {
        id: "55",
        name: "Non-Veg Delight",
        price: 190,
        originalPrice: 250,
        description: "Chicken Biryani + Chicken Curry + Paratha + Dessert - Save ₹60!",
        color: "bg-linear-to-br from-red-400 to-pink-500",
        image: "/non-veg-delight-combo.jpg",
        discount: "24% OFF",
      },
      {
        id: "56",
        name: "Snacks Pack",
        price: 95,
        originalPrice: 130,
        description: "3 Samosas + 2 Puffs + 2 Bajjis + Chutney - Save ₹35!",
        color: "bg-linear-to-br from-yellow-300 to-amber-400",
        image: "/snacks-pack-combo.jpg",
        discount: "27% OFF",
      },
      {
        id: "57",
        name: "Sweet Tooth Combo",
        price: 120,
        originalPrice: 160,
        description: "4 Different Desserts + Milkshake - Save ₹40!",
        color: "bg-linear-to-br from-pink-300 to-purple-400",
        image: "/sweet-tooth-combo.jpg",
        discount: "25% OFF",
      },
      {
        id: "58",
        name: "Student Special",
        price: 75,
        originalPrice: 100,
        description: "Idli + Vada + Coffee - Exclusive for students - Save ₹25!",
        color: "bg-linear-to-br from-blue-300 to-indigo-400",
        image: "/student-special-combo.jpg",
        discount: "25% OFF",
      },
    ],
  }

  const handleAddToCart = (item: { id: string; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    localStorage.setItem("cart", JSON.stringify(cart))
    router.push("/checkout")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    clearNotifications()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-orange-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-green-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-linear-to-br from-yellow-200 to-transparent rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10">
        <header className="bg-linear-to-r from-orange-600 to-red-600 text-white sticky top-0 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">🍲 MEC Canteen</h1>
              <p className="text-orange-100 text-sm">South Indian Delights at Your Doorstep</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <Bell size={24} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifications && notifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-foreground rounded-lg shadow-2xl z-20 p-4 border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-yellow-600">Order Notifications</h3>
                      <button 
                        onClick={clearNotifications}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 bg-linear-to-r from-orange-50 to-yellow-50 rounded-lg text-sm border-l-4 border-yellow-400"
                        >
                          <p className="font-semibold text-gray-800">{notif.message}</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => router.push("/feedback")}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-lg"
              >
                ⭐ Feedback
              </Button>
              <Button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white font-bold">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Category Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {[
              { id: "veg", label: "🥗 Vegetarian", color: "from-green-400 to-green-600" },
              { id: "nonveg", label: "🍗 Non-Vegetarian", color: "from-red-400 to-red-600" },
              { id: "snacks", label: "🌶️ Snacks & More", color: "from-yellow-400 to-yellow-600" },
              { id: "desserts", label: "🍨 Desserts", color: "from-pink-400 to-pink-600" },
              { id: "special", label: "👑 Special Items", color: "from-purple-400 to-indigo-600" },
              { id: "combos", label: "🎁 Combos & Offers", color: "from-orange-400 to-red-500" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition transform hover:scale-105 ${
                  category === cat.id
                    ? `bg-linear-to-r ${cat.color} text-white shadow-lg`
                    : "bg-white/80 text-gray-800 hover:bg-white shadow-md"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items Grid */}
            <div className="lg:col-span-2">
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
              <CartSummary cart={cart} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}