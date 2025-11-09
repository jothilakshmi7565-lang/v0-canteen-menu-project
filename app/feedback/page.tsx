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
    const token = localStorage.getItem("token")
    if (!userData || !token) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Load existing feedback
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
      date: new Date().toLocaleDateString(),
    }

    const updatedList = [newFeedback, ...feedbackList]
    setFeedbackList(updatedList)
    localStorage.setItem("feedbackList", JSON.stringify(updatedList))

    setSubmitted(true)
    setRating(0)
    setFeedbackText("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MEC Canteen - Feedback</h1>
            <p className="text-sm opacity-90">Share your experience with us</p>
          </div>
          <Button
            onClick={() => router.push("/menu")}
            className="bg-primary-foreground text-primary hover:bg-opacity-90"
          >
            Back to Menu
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Rate Your Experience</h2>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6">
                Thank you for your feedback!
              </div>
            )}

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition transform hover:scale-125"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {rating > 0 && `You rated: ${rating} star${rating !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Feedback Text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Your Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us about your experience with our food and service..."
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={5}
              />
            </div>

            <Button
              onClick={handleSubmitFeedback}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              Submit Feedback
            </Button>
          </Card>

          {/* Feedback List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedbackList.length === 0 ? (
                <p className="text-muted-foreground">No feedback yet. Be the first to share!</p>
              ) : (
                feedbackList.map((feedback, idx) => (
                  <Card key={idx} className="p-4 bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{feedback.user}</p>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{feedback.text}</p>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
