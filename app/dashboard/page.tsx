"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "../../components/ui/card"
import { TopNav } from "../../components/top-nav"
import { Button } from "../../components/ui/button"
import { Tally3, Sparkles, TrendingUp, Calendar, Clock } from "lucide-react"

export default function DashboardPage() {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  })

  const recentOutfits = [
    { id: 1, name: "Summer Casual", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Office Chic", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Weekend Brunch", image: "/placeholder.svg?height=200&width=200" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Office Meeting", date: "Today, 2:00 PM" },
    { id: 2, name: "Dinner Party", date: "Tomorrow, 7:30 PM" },
    { id: 3, name: "Weekend Getaway", date: "Saturday, All Day" },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <TopNav />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2F4F4F] mb-2">{greeting}, Saloni!</h1>
          <p className="text-lg text-[#556B6B]">Let's find your perfect outfit today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Virtual Tryouts",
              icon: <Tally3 className="h-6 w-6" />,
              color: "bg-[#9eb3a6]",
              href: "/dashboard/virtual-tryouts",
            },
            {
              title: "Ask Me Anything",
              icon: <Sparkles className="h-6 w-6" />,
              color: "bg-[#BAB86C]",
              href: "/dashboard/ask-me-anything",
            },
            {
              title: "Reels",
              icon: <TrendingUp className="h-6 w-6" />,
              color: "bg-[#4A7A6F]",
              href: "/dashboard/reels",
            },
            {
              title: "Anything New?",
              icon: <Clock className="h-6 w-6" />,
              color: "bg-[#556B6B]",
              href: "/dashboard/anything-new",
            },
          ].map((action, index) => (
            <Card
              key={index}
              className={`${action.color} text-white hover:scale-105 transition-all duration-300 cursor-pointer`}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                {action.icon}
                <h3 className="mt-3 font-semibold">{action.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Outfits */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#2F4F4F]">Recent Outfits</h2>
            <Button variant="outline" className="text-[#2F4F4F] border-[#2F4F4F]">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentOutfits.map((outfit) => (
              <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image src={outfit.image || "/placeholder.svg"} alt={outfit.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#2F4F4F]">{outfit.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#2F4F4F]">Upcoming Events</h2>
            <Button variant="outline" className="text-[#2F4F4F] border-[#2F4F4F]">
              Add Event
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                <div className="bg-[#9eb3a6] text-white p-3 rounded-full mr-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2F4F4F]">{event.name}</h3>
                  <p className="text-sm text-[#556B6B]">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

