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
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
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
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id)
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const clearNotifications = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
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
