'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { User, Mail, Phone } from 'lucide-react'

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, phone, message })
  }

  return (
    (<form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="flex items-center space-x-2 text-[#2F4F4F]">
          <User size={20} />
          <span>Name</span>
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/50 border-[#2F4F4F]/30" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="flex items-center space-x-2 text-[#2F4F4F]">
          <Mail size={20} />
          <span>Email</span>
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/50 border-[#2F4F4F]/30" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="flex items-center space-x-2 text-[#2F4F4F]">
          <Phone size={20} />
          <span>Phone Number</span>
        </label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-white/50 border-[#2F4F4F]/30" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-[#2F4F4F]">Message</label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="bg-white/50 border-[#2F4F4F]/30"
          rows={4} />
      </div>
      <Button type="submit" className="w-full bg-[#556B2F] hover:bg-[#4A5F29]">
        Send Message
      </Button>
    </form>)
  );
}

