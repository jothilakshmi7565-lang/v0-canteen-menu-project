"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Trash2 } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackList, setFeedbackList] = useState<
    Array<{ id: string; user: string; rating: number; text: string; date: string }>
  >([])
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
      id: Date.now().toString(),
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

  const handleDeleteFeedback = (id: string) => {
    const updatedList = feedbackList.filter((f) => f.id !== id)
    setFeedbackList(updatedList)
    localStorage.setItem("feedbackList", JSON.stringify(updatedList))
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const averageRating =
    feedbackList.length > 0 ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1) : 0

  const ratingCounts = {
    5: feedbackList.filter((f) => f.rating === 5).length,
    4: feedbackList.filter((f) => f.rating === 4).length,
    3: feedbackList.filter((f) => f.rating === 3).length,
    2: feedbackList.filter((f) => f.rating === 2).length,
    1: feedbackList.filter((f) => f.rating === 1).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200 to-transparent rounded-full blur-3xl opacity-40"></div>

      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">⭐ MEC Canteen - Feedback</h1>
            <p className="text-blue-100 text-sm">Your feedback helps us improve</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/menu")}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              Back to Menu
            </Button>
            <Button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white font-semibold">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/95 backdrop-blur border-0 shadow-2xl">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rate Your Experience
              </h2>
              <p className="text-muted-foreground mb-8 font-medium">Help us serve you better</p>

              {submitted && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 animate-pulse font-semibold flex items-center gap-2">
                  <span className="text-2xl">✓</span> Thank you for your valuable feedback!
                </div>
              )}

              {/* Star Rating */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-4">How would you rate us?</label>
                <div className="flex gap-4">
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
                        size={48}
                        className={`${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                            : "text-gray-300"
                        } transition-all`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-base text-purple-600 font-bold mt-4">
                    Rating: {rating} out of 5 stars {["😢", "😕", "😐", "😊", "😍"][rating - 1]}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-3">Your Feedback</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your experience with our food and service. What did you like? What can we improve?"
                  className="w-full p-4 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none bg-white font-medium"
                  rows={6}
                />
                <p className="text-sm text-muted-foreground mt-2">{feedbackText.length}/500 characters</p>
              </div>

              <Button
                onClick={handleSubmitFeedback}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition transform hover:scale-105 text-lg"
              >
                Submit Feedback ✓
              </Button>
            </Card>
          </div>

          {/* Feedback Stats and Reviews */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/95 backdrop-blur border-0 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Customer Reviews
              </h3>

              {/* Rating Summary */}
              {feedbackList.length > 0 && (
                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-purple-600">{averageRating}</div>
                    <div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={
                              i < Math.round(Number(averageRating))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground font-semibold">{feedbackList.length} reviews</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 w-12">{stars}★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                            style={{
                              width: `${feedbackList.length > 0 ? (ratingCounts[stars as keyof typeof ratingCounts] / feedbackList.length) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600 w-8">
                          {ratingCounts[stars as keyof typeof ratingCounts]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Reviews List */}
            <Card className="p-6 bg-white/95 backdrop-blur border-0 shadow-2xl max-h-96 overflow-y-auto">
              {feedbackList.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">📝</p>
                  <p className="text-muted-foreground font-medium">No reviews yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feedbackList.map((feedback) => (
                    <Card
                      key={feedback.id}
                      className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-400 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-800">{feedback.user}</p>
                          <p className="text-xs text-muted-foreground">{feedback.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => handleDeleteFeedback(feedback.id)}
                            className="text-red-400 hover:text-red-600 transition"
                            title="Delete feedback"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed font-medium">{feedback.text}</p>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
