"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackList, setFeedbackList] = useState<Array<{ user: string; rating: number; text: string; date: string }>>(
    [],
  )
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userType = localStorage.getItem("userType")
    const token = localStorage.getItem("token")

    if (!userData || !token || userType !== "user") {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    const savedFeedback = localStorage.getItem("feedbackList")
    if (savedFeedback) {
      setFeedbackList(JSON.parse(savedFeedback))
    }
  }, [router])

  const handleSubmitFeedback = () => {
    if (!feedbackText || rating === 0) {
      alert("Please provide a rating and feedback")
      return
    }

    const newFeedback = {
      user: user?.username || "Anonymous",
      rating,
      text: feedbackText,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    const updatedList = [newFeedback, ...feedbackList]
    setFeedbackList(updatedList)
    localStorage.setItem("feedbackList", JSON.stringify(updatedList))

    setSubmitted(true)
    setRating(0)
    setFeedbackText("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const averageRating =
    feedbackList.length > 0 ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MEC Canteen - Feedback</h1>
            <p className="text-sm opacity-90">Share your experience with us</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/menu")}
              className="bg-primary-foreground text-primary hover:bg-opacity-90"
            >
              Back to Menu
            </Button>
            <Button onClick={handleLogout} className="bg-primary-foreground text-primary hover:bg-opacity-90">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-2 text-primary">Rate Your Experience</h2>
            <p className="text-muted-foreground mb-6">Help us improve our service</p>

            {submitted && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-6 animate-pulse">
                Thank you for your valuable feedback!
              </div>
            )}

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">How would you rate us?</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition transform hover:scale-125"
                    title={
                      star === 1
                        ? "Poor"
                        : star === 2
                          ? "Fair"
                          : star === 3
                            ? "Good"
                            : star === 4
                              ? "Very Good"
                              : "Excellent"
                    }
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                          : "text-muted-foreground"
                      } transition-all`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && <p className="text-sm text-primary font-semibold mt-2">Rating: {rating} out of 5 stars</p>}
            </div>

            {/* Feedback Text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Your Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your experience with our food and service. What did you like? What can we improve?"
                className="w-full p-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white"
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">{feedbackText.length}/500 characters</p>
            </div>

            <Button
              onClick={handleSubmitFeedback}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Submit Feedback
            </Button>
          </Card>

          {/* Feedback Stats and Reviews */}
          <div>
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary/20 mb-6">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

              {/* Rating Summary */}
              {feedbackList.length > 0 && (
                <div className="mb-6 pb-6 border-b-2 border-primary/20">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl font-bold text-primary">{averageRating}</div>
                    <div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.round(Number(averageRating))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{feedbackList.length} reviews</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {feedbackList.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-2">No reviews yet</p>
                    <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
                  </div>
                ) : (
                  feedbackList.map((feedback, idx) => (
                    <Card key={idx} className="p-4 bg-white border-l-4 border-yellow-400 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{feedback.user}</p>
                          <p className="text-xs text-muted-foreground">{feedback.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{feedback.text}</p>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
