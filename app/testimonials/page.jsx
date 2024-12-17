'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {MenuBar} from "../../components/MenuBar" // Import the existing MenuBar component

export default function TestimonialsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const testimonials = [
    {
      name: "Saranya Seth",
      role: "Fashion Enthusiast",
      content: "StyleMate has completely transformed how I organize my wardrobe. The personalized suggestions are spot-on!",
    //   image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "Celina George",
      role: "Busy Professional",
      content: "The virtual closet feature saves me so much time in the morning. It's like having a personal stylist!",
    //   image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "Aarohi Jain",
      role: "Sustainable Fashion Advocate",
      content: "I love how StyleMate helps me make more sustainable fashion choices while staying stylish.",
    //   image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "Ishita Verma",
      role: "Style Blogger",
      content: "The color coordination tips have elevated my outfit game. This app is a game-changer!",
    //   image: "/placeholder.svg?height=100&width=100"
    }
  ];
  return (
    <div className="min-h-screen bg-[#E6EFE9] pt-16 text-white">
      {/* Call MenuBar */}
      <MenuBar />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-[#000000] mb-8 text-center">What Our Users Have To Say</h1>
        
        {/* Cinema-like Video Section */}
        <div className="mb-12">
          <div className="relative w-full aspect-[16/9] bg-black rounded-t-xl overflow-hidden">
            {/* Curtains */}
            <div className={`absolute inset-0 flex transition-all duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-1/2 h-full bg-[#8B0000] transform origin-left transition-all duration-1000 ease-in-out" style={{transform: isPlaying ? 'scaleX(0)' : 'scaleX(1)'}} />
              <div className="w-1/2 h-full bg-[#8B0000] transform origin-right transition-all duration-1000 ease-in-out" style={{transform: isPlaying ? 'scaleX(0)' : 'scaleX(1)'}} />
            </div>
            
            {/* Video Placeholder */}
            <video 
              className="w-full h-full object-cover"
              src="final.mp4"
              controls={isPlaying}
            >
              Your browser does not support the video tag.
            </video>

            {/* Play Button */}
            {!isPlaying && (
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-6xl"
                onClick={() => setIsPlaying(true)}
              >
                ▶
              </button>
            )}
          </div>
          
          {/* Theater Seats */}
          <div className="h-16 bg-[#2F4F4F] rounded-b-xl flex items-end justify-center pb-2">
            <div className="w-3/4 h-4 bg-[#4A7A6F] rounded-t-md" />
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
  {testimonials.map((testimonial, index) => (
    <div key={index} className="bg-[#556B6B] p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {/* <img 
          src={testimonial.image} 
          alt={`${testimonial.name}'s photo`} 
          className="h-16 w-16 rounded-full mr-4"
        /> */}
        <div>
          <p className="text-lg font-bold text-[#E6EFE9]">{testimonial.name}</p>
          <p className="text-sm text-[#BAB86C]">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-[#E6EFE9] mb-4">{testimonial.content}</p>
    </div>
  ))}
</div>
        
        {/* Join Us Button */}
        <div className="text-center">
          <Button 
            className="bg-[#4A7A6F] text-white hover:bg-[#2F4F4F] transition-colors duration-300 text-lg px-8 py-3 rounded-full"
          >
            Join Us
          </Button>
        </div>
      </div>
    </div>
  )
}
