"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Notification {
  id: string
  message: string
  type: "order" | "ready" | "success" | "info"
  time: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: Notification["type"]) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Load notifications based on user type
    const userType = localStorage.getItem("userType")
    
    if (userType === "chef") {
      // For chefs, load chef-specific notifications
      const savedNotifications = localStorage.getItem("chefNotifications")
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications)
          // Convert to standard notification format
          const formatted = parsed.map((n: any) => ({
            id: n.id,
            message: n.message,
            type: "info" as const,
            time: n.time
          }))
          setNotifications(formatted)
        } catch (e) {
          console.error("Error parsing chef notifications", e)
        }
      }
    } else {
      // For customers, load regular notifications
      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        try {
          setNotifications(JSON.parse(savedNotifications))
        } catch (e) {
          console.error("Error parsing notifications", e)
        }
      }
    }
  }, [])

  const addNotification = (message: string, type: Notification["type"] = "info") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }
    setNotifications((prev) => {
      const updated = [newNotification, ...prev]
      
      // Save to appropriate storage based on user type
      const userType = localStorage.getItem("userType")
      if (userType === "chef") {
        // For chefs, we'll add to chefNotifications but also keep in context
        const chefNotifications = JSON.parse(localStorage.getItem("chefNotifications") || "[]")
        const updatedChefNotifications = [newNotification, ...chefNotifications]
        localStorage.setItem("chefNotifications", JSON.stringify(updatedChefNotifications))
      } else {
        localStorage.setItem("notifications", JSON.stringify(updated))
      }
      
      return updated
    })
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id)
      
      // Update appropriate storage based on user type
      const userType = localStorage.getItem("userType")
      if (userType === "chef") {
        const chefNotifications = JSON.parse(localStorage.getItem("chefNotifications") || "[]")
        const updatedChefNotifications = chefNotifications.filter((n: any) => n.id !== id)
        localStorage.setItem("chefNotifications", JSON.stringify(updatedChefNotifications))
      } else {
        localStorage.setItem("notifications", JSON.stringify(updated))
      }
      
      return updated
    })
  }

  const clearNotifications = () => {
    setNotifications([])
    
    // Clear appropriate storage based on user type
    const userType = localStorage.getItem("userType")
    if (userType === "chef") {
      localStorage.removeItem("chefNotifications")
    } else {
      localStorage.removeItem("notifications")
    }
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}