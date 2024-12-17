'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {MenuBar} from "../../components/MenuBar" // Import the existing MenuBar component

export default function HowStyleMatePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-[#E6EFE9] pt-16 text-white">
            <MenuBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#000000] mb-8 text-center">How StyleMate Works</h1>
        
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
              src="whystylemate.mp4"
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
        
        {/* How StyleMate Works Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            "Sign up and create your profile",
            "Upload photos of your wardrobe",
            "Get personalized style recommendations"
          ].map((step, index) => (
            <div key={index} className="bg-[#2F4F4F] p-6 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-[#4A7A6F] mb-4">{index + 1}</div>
              <p className="text-[#E6EFE9]">{step}</p>
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

