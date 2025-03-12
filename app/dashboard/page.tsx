"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "../../components/ui/card"
import { TopNav } from "../../components/top-nav"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { format } from "date-fns"
import { Tally3, Sparkles, TrendingUp, CalendarIcon, Clock, X } from "lucide-react"
import { cn } from "../../lib/utils"

interface Event {
  id: number
  name: string
  date: string
  outfit?: string
}

export default function DashboardPage() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  })
  // const [date, setDate] = useState("");
  const [date, setDate] = useState<string>(""); // ✅ Ensure it's always a string
  const [time, setTime] = useState<string>("");
  
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: "Office Meeting", date: "Today, 2:00 PM", outfit: "Office Chic" },
    { id: 2, name: "Dinner Party", date: "Tomorrow, 7:30 PM", outfit: "Party Girl" },
    { id: 3, name: "Weekend Getaway", date: "Saturday, All Day", outfit: "Adventure Time" },
  ])
  const [newEvent, setNewEvent] = useState({ name: "", outfit: "" })

  const recentOutfits = [
    { id: 1, name: "Summer Casual", image: "/d1.jpg" },
    { id: 2, name: "Office Chic", image: "/d2.webp" },
    { id: 3, name: "Weekend Brunch", image: "/d3.jpg" },
  ]

  const additionalOutfits = [
    { id: 4, name: "Winter Outfit", image: "/d4.jpg" },
    { id: 5, name: "Party Girl", image: "/d5.jpg" },
    { id: 6, name: "Adventure Time", image: "/d6.avif" },
  ]

  const allOutfits = [...recentOutfits, ...additionalOutfits]

  const handleAddEvent = () => {
    if (newEvent.name && date) {
      const formattedDate = format(date, "EEEE, h:mm aa")
      setEvents([
        ...events,
        {
          id: events.length + 1,
          name: newEvent.name,
          date: formattedDate,
          outfit: newEvent.outfit,
        },
      ])
      setNewEvent({ name: "", outfit: "" })
      setDate("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE6DC] via-[#F5E1C8] to-[#EADBC8]">
      <TopNav />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2F4F4F] mb-2">Welcome Back, Saloni!!</h1>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-[#2F4F4F] border-[#2F4F4F]">
                  View All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Outfits</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {allOutfits.map((outfit) => (
                    <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-48">
                      <Image
  src={outfit.image ?? "/placeholder.svg"} 
  alt={outfit.name ?? "Outfit Image"} 
  fill 
  className="object-cover"
/>

                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-[#2F4F4F]">{outfit.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-[#2F4F4F] border-[#2F4F4F]">
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input
                      id="event-name"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      placeholder="Enter event name"
                    />
                  </div>
                  <div className="grid gap-2">
  <Label>Date & Time</Label>

  {/* Date Input */}
  {/* Date Input */}
<Input
  type="text"
  value={date} // ✅ Convert Date to String
  onChange={(e) => setDate(e.target.value)}
  placeholder="DD/MM/YYYY"
  className="w-full"
/>

{/* Time Input */}
<Input
  type="text"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  placeholder="HH:MM (24-hour)"
  className="w-full"
/>

</div>

                  <div className="grid gap-2">
                    <Label htmlFor="outfit">Select Outfit</Label>
                    <Select onValueChange={(value) => setNewEvent({ ...newEvent, outfit: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an outfit" />
                      </SelectTrigger>
                      <SelectContent>
                        {allOutfits.map((outfit) => (
                          <SelectItem key={outfit.id} value={outfit.name}>
                            {outfit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddEvent} className="bg-[#4A7A6F] hover:bg-[#2F4F4F] mt-2">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                <div className="bg-[#9eb3a6] text-white p-3 rounded-full mr-4">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-[#2F4F4F]">{event.name}</h3>
                  <p className="text-sm text-[#556B6B]">{event.date}</p>
                  {event.outfit && <p className="text-sm text-[#4A7A6F]">Outfit: {event.outfit}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setEvents(events.filter((e) => e.id !== event.id))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

