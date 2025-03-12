"use client"

import { useState } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { TrendingUp, Calendar, ShoppingBag, Sparkles, ArrowRight, Star } from "lucide-react"

export default function AnythingNewPage() {
  const [activeTab, setActiveTab] = useState("trends")

  const trendingItems = [
    {
      id: 1,
      title: "Oversized Blazers",
      description: "The perfect balance of professional and casual, oversized blazers are dominating street style.",
      image: "/over.jpeg?height=300&width=400",
      tags: ["Workwear", "Casual", "Trending"],
    },  
    {
      id: 2,
      title: "Platform Loafers",
      description:
        "Combining comfort with style, platform loafers are the footwear choice for fashion-forward individuals.",
      image: "/loafer.jpeg?height=300&width=400",
      tags: ["Footwear", "Retro", "Comfort"],
    },
    {
      id: 3,
      title: "Statement Collars",
      description: "From peter pan to exaggerated pointed collars, this detail is making waves in fashion circles.",
      image: "/collar.jpeg?height=300&width=400",
      tags: ["Details", "Feminine", "Vintage"],
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Paris Fashion Week",
      date: "March 15-22, 2025",
      location: "Paris, France",
      image: "/paris fashion week.jpeg?height=200&width=400",
    },
    {
      id: 2,
      title: "Sustainable Fashion Summit",
      date: "April 5-7, 2025",
      location: "New York, USA",
      image: "/sustainable fashion summit.jpeg?height=200&width=400",
    },
    {
      id: 3,
      title: "Vintage Clothing Expo",
      date: "April 18-19, 2025",
      location: "London, UK",
      image: "/vintage clothing expo.jpeg?height=200&width=400",
    },
  ]

  const newCollections = [
    {
      id: 1,
      brand: "Eco Essentials",
      title: "Spring Collection",
      description: "Sustainable fabrics meet modern silhouettes in this breathtaking spring lineup.",
      image: "/spring collection.jpeg?height=300&width=400",
      rating: 4.8,
    },
    {
      id: 2,
      brand: "Urban Minimalist",
      title: "Capsule Wardrobe Basics",
      description: "Timeless pieces designed to mix and match for endless outfit possibilities.",
      image: "/capsule wardrobe basic.jpeg?height=300&width=400",
      rating: 4.5,
    },
    {
      id: 3,
      brand: "Color Theory",
      title: "Vibrant Essentials",
      description: "Bold colors and patterns to brighten your wardrobe and mood.",
      image: "/vibrant essentials.jpeg?height=300&width=400",
      rating: 4.7,
    },
  ]

  return (
    // <div className="min-h-screen bg-[#F5F5DC]">
    <div className="min-h-screen bg-gradient-to-br from-[#EFE6DC] via-[#F5E1C8] to-[#EADBC8]">

      <TopNav />

      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-6">Anything New?</h1>
        <p className="text-lg text-[#556B6B] mb-8">
          Stay updated with the latest fashion trends, upcoming events, and new collections.
        </p>

        <Tabs defaultValue="trends" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Collections
            </TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-[#2F4F4F]">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">{item.title}</h3>
                    <p className="text-[#556B6B] mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-[#4A7A6F] border-[#4A7A6F]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-[#9eb3a6] hover:bg-[#4A7A6F] flex items-center justify-center">
                      <span>Explore Trend</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>

                    <CardContent className="p-6 md:w-2/3">
                      <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">{event.title}</h3>

                      <div className="flex items-center text-[#556B6B] mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>

                      <p className="text-[#556B6B] mb-4">Location: {event.location}</p>

                      <div className="flex space-x-3">
                        <Button className="bg-[#2F4F4F] hover:bg-[#4A7A6F]">Learn More</Button>
                        <Button variant="outline" className="border-[#2F4F4F] text-[#2F4F4F]">
                          Add to Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}

              <div className="text-center mt-8">
                <Button variant="outline" className="border-[#2F4F4F] text-[#2F4F4F]">
                  View All Events
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge className="bg-[#9eb3a6] mb-2">{collection.brand}</Badge>
                        <h3 className="text-xl font-semibold text-[#2F4F4F]">{collection.title}</h3>
                      </div>

                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{collection.rating}</span>
                      </div>
                    </div>

                    <p className="text-[#556B6B] mb-4">{collection.description}</p>

                    <Button className="w-full bg-[#2F4F4F] hover:bg-[#4A7A6F]">View Collection</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-[#2F4F4F] text-[#2F4F4F]">
                Browse All Collections
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

