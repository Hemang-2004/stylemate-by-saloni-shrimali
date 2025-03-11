"use client"

import type React from "react"
// import { useRef } from "react";
import { useState, useRef, useEffect } from "react"
// import { ScrollArea, ScrollViewport } from "@radix-ui/react-scroll-area";

import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent } from "../../../components/ui/card"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Send, ThumbsUp, ThumbsDown, Copy, ImageIcon, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

const suggestedQuestions = [
  "What should I wear today?",
  "How do I style a white shirt?",
  "What colors go with navy blue?",
  "How to build a capsule wardrobe?",
  "Best outfits for a job interview?",
  "How to dress for my body type?",
  "Sustainable fashion tips?",
  "How to mix patterns?",
]

export default function AskMeAnythingPage() {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your StyleMate AI assistant. Ask me anything about fashion, styling, or your wardrobe!",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: message,
      ...(selectedImage && { image: selectedImage }),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Create a controller to handle stream
      const controller = new AbortController()
      const { signal } = controller

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
            ...(msg.image && { image: msg.image }),
          })),
        }),
        signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if the response is a stream
      if (response.headers.get("content-type")?.includes("text/plain")) {
        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let responseText = ""

        // Add an empty assistant message that we'll update
        setChatMessages((prev) => [...prev, { role: "assistant", content: "" }])

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            responseText += chunk

            // Update the last message with the accumulated text
            setChatMessages((prev) => {
              const newMessages = [...prev]
              newMessages[newMessages.length - 1].content = responseText
              return newMessages
            })
          }
        }
      } else {
        // Handle JSON response (likely an error)
        const data = await response.json()
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.response }])
      }
    } catch (error) {
      console.error("Error:", error)
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
      setSelectedImage(null)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question)
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <TopNav />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-4">Ask Me Anything</h1>
        <p className="text-gray-600 mb-8">
          Get personalized fashion advice, styling tips, and answers to all your style questions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Suggestions */}
          <Card className="lg:col-span-1 order-2 lg:order-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-[#2F4F4F] mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-[#4A7A6F]" />
                Suggested Questions
              </h2>

              <div className="space-y-3">
                {suggestedQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#E6EFE9] rounded-lg cursor-pointer hover:bg-[#9eb3a6] hover:text-white transition-colors"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <p className="text-sm">{question}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-medium text-[#2F4F4F] mb-3">Style Tip of the Day</h3>
                <div className="bg-[#E6EFE9] p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Invest in quality basics and add personality with accessories. This creates a versatile wardrobe
                    that can be mixed and matched for countless outfits."
                  </p>
                  <p className="text-xs text-right mt-2 text-[#4A7A6F]">— StyleMate Tip</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Center Panel - Chat */}
          <Card className="lg:col-span-2 order-1 lg:order-2">
            <CardContent className="p-6 flex flex-col h-[600px]">
            <ScrollArea className="flex-grow mb-4 pr-4">
            <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        {msg.image && (
                          <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                            <Image
                              src={msg.image || "/placeholder.svg"}
                              alt="Uploaded image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-[#4A7A6F] text-white rounded-tr-none"
                              : "bg-[#E6EFE9] text-[#2F4F4F] rounded-tl-none"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.role === "assistant" && msg.content && (
                          <div className="flex items-center space-x-2 mt-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handleCopyMessage(msg.content)}
                            >
                              <Copy className="h-4 w-4 text-[#4A7A6F]" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 text-[#4A7A6F]" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsDown className="h-4 w-4 text-[#4A7A6F]" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#E6EFE9] text-[#2F4F4F] p-3 rounded-lg rounded-tl-none">
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {selectedImage && (
                <div className="mb-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected image"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Ask about styling, trends, or wardrobe tips..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#4A7A6F] hover:bg-[#2F4F4F]"
                  disabled={(!message.trim() && !selectedImage) || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

