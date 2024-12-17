'use client'

import { useRef, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const testimonials = [
  {
    name: "Saranya Seth",
    role: "Fashion Enthusiast",
    content: "StyleMate has completely transformed how I organize my wardrobe. The personalized suggestions are spot-on!",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Celina George",
    role: "Busy Professional",
    content: "The virtual closet feature saves me so much time in the morning. It's like having a personal stylist!",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Aarohi Jain",
    role: "Sustainable Fashion Advocate",
    content: "I love how StyleMate helps me make more sustainable fashion choices while staying stylish.",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Ishita Verma ",
    role: "Style Blogger",
    content: "The color coordination tips have elevated my outfit game. This website is a game-changer!",
    image: "/placeholder.svg?height=100&width=100"
  }
]

function MovingGradientBackground() {
  const gradientRef = useRef(null)


  useEffect(() => {
    const gradientElement = gradientRef.current
    if (!gradientElement) return

    let degree = 0
    const animateGradient = () => {
      degree = (degree + 7) % 360
      gradientElement.style.background = `
        conic-gradient(
          from ${degree}deg,
          #FAF3E0, /* Light Beige */
          #E2EDE7, /* Soft Greenish-White */
          #B0C4B1, /* Light Moss Green */
          #8FB39C, /* Gentle Sage Green */
          #5A8B79, /* Deep Teal Green */
          #3E5F55, /* Rich Forest Green */
          #2C4A42, /* Dark Evergreen */
          #3E5F55, /* Rich Forest Green Repeated */
          #5A8B79, /* Deep Teal Green Repeated */
          #8FB39C, /* Gentle Sage Green */
          #B0C4B1, /* Light Moss Green */
          #E2EDE7, /* Soft Greenish-White */
          #FAF3E0  /* Light Beige Repeated */
            
        )
      `
      requestAnimationFrame(animateGradient)
    }

    const animationFrame = requestAnimationFrame(animateGradient)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div
      ref={gradientRef}
      className="absolute inset-0 opacity-20 rounded-full"
      style={{
        filter: 'blur(100px)',
        transform: 'scale(1.5)',
        animation: 'rotate 20s linear infinite',
      }}
    />
  )
}

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F5F5DC] flex items-center justify-center relative overflow-hidden">
      <MovingGradientBackground />
      <div className="container relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#2F4F4F]">What Our Users Say</h2>
        <div className="grid gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
              <Card
                className="max-w-lg transform hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="flex gap-4 p-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="mt-2 text-[#2F4F4F]">{testimonial.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

