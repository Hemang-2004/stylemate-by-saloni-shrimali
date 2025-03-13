"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent } from "../../../components/ui/card"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Send, ThumbsUp, ThumbsDown, Copy, ImageIcon, Sparkles, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../../../components/ui/alert"

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

// You'll need to add your Gemini API key here or use environment variables
const GEMINI_API_KEY = "AIzaSyD5vUNECX12IL5hJliD2A5ehgOKyMUfENY"

export default function AskMeAnythingPage() {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your StyleMate AI assistant. Ask me anything about fashion, styling, or your wardrobe!",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

    setError(null)

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
      // Format the conversation history for Gemini API
      const conversationHistory = chatMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      // Add the new user message
      // Construct userContent ensuring each part has a text property
      const userContent: { text: string; inline_data?: { mime_type: string; data: string } }[] = []

      // Ensure message is always a string
      const messageText = message.trim() ? message : "User provided an input."
      
      // If there's a message, add it as text
      userContent.push({ text: messageText })
      
      // If there's an image, add it with a description
      if (selectedImage) {
        userContent.push({
          text: "User provided an image for analysis.",
          inline_data: { mime_type: "image/jpeg", data: selectedImage.split(",")[1] },
        })
      }
      
      // Add to conversation history
      conversationHistory.push({
        role: "user",
        parts: userContent,
      })
      

      // Prepare system prompt to guide response formatting
      const systemPrompt = {
        role: "model",
        parts: [
          {
            text: `WHEN EVER YOU WILL GIVE THE ANSWER DONT PUT ANY * or ANY DOUBLE * OR ANYTHING JUST GIVE IT TO ME IN PLAIN PARAGRAPHS AND POINTS You are StyleMate, a fashion and styling assistant. Respond in a conversational, friendly tone. 
          Format your responses with clear sections, using bullet points for lists and emphasis for important points. 
          DO NOT use markdown formatting DO NOT PUT ANY * also JUST PLAIN TEXT. Instead, use natural language and conversational style.
          When giving fashion advice:
          - Provide specific, actionable tips
          - Consider the user's context if provided
          - Organize information in a visually appealing way with short paragraphs
          - Use friendly, encouraging language
          - If analyzing an image, be specific about what you see and provide relevant styling advice`,
          },
        ],
      }

      // Add system prompt to the beginning of conversation
      const fullConversation = [systemPrompt, ...conversationHistory]

      // Direct API call to Gemini
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: fullConversation,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Failed to get response from Gemini API")
      }

      const data = await response.json()

      // Extract the response text from Gemini API
      const assistantResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response."

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantResponse,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
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
    <div className="min-h-screen bg-gradient-to-br from-[#EFE6DC] via-[#F5E1C8] to-[#EADBC8]">
      <TopNav />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-4">Ask Me Anything !!</h1>
        <p className="text-gray-600 mb-8">
          Get personalized fashion advice, styling tips, and answers to all your style questions.
        </p>

        {!GEMINI_API_KEY && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please add your Gemini API key as an environment variable named NEXT_PUBLIC_GEMINI_API_KEY to use this
              feature.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
              <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
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
                      <div className="bg-[#E6EFE9] text-[#2F4F4F] p-4 rounded-lg rounded-tl-none">
                        <div className="flex items-center">
                          <div className="clothes-loader">
                            <div className="hanger"></div>
                            <div className="dress"></div>
                            <div className="dot dot-1"></div>
                            <div className="dot dot-2"></div>
                            <div className="dot dot-3"></div>
                          </div>
                          <p className="ml-3 text-sm font-medium">Styling your answer...</p>
                        </div>
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
                  disabled={isLoading || !GEMINI_API_KEY}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#4A7A6F] hover:bg-[#2F4F4F]"
                  disabled={(!message.trim() && !selectedImage) || isLoading || !GEMINI_API_KEY}
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

