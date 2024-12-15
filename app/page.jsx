// 'use client'
"use client"; // Add this line at the top

import { useState } from 'react'
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { NavBar } from "../components/nav-bar"
import { AnimatedButton } from "../components/animated-button"
import { Testimonials } from "../components/testimonials"
import { BlogSection } from "../components/blog-section"
import { WriteBlogSection } from "../components/write-blog-section"
import { Footer } from "../components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { ScrollArea } from "../components/ui/scroll-area"

export const metadata = {
  title: "StyleMate - Virtual Wardrobe Assistant",
  description: "Your personal style companion for wardrobe organization and outfit suggestions",
}

const features = [
  {
    title: "Virtual Closet",
    image: "/feature1.png",
    description: "Organize your wardrobe digitally",
    fullContent: "The Virtual Closet feature allows you to digitally catalog and organize your entire wardrobe. Upload photos of your clothes, accessories, and shoes to create a comprehensive digital inventory. Easily categorize items by type, color, season, or occasion. This feature helps you visualize your entire wardrobe at a glance, making it easier to plan outfits and identify gaps in your collection."
  },
  {
    title: "Decluttering Tips",
    image: "/feature2.png",
    description: "Simplify your wardrobe",
    fullContent: "Our Decluttering Tips feature provides expert advice on how to streamline your wardrobe. Learn about the popular KonMari method, capsule wardrobe techniques, and other strategies to help you identify which items to keep, donate, or discard. We'll guide you through the process of creating a more manageable and enjoyable wardrobe that truly reflects your style and needs."
  },
  {
    title: "Sustainable Tips",
    image: "/feature3.png",
    description: "Eco-friendly fashion choices",
    fullContent: "Our Sustainable Tips feature offers guidance on making more environmentally conscious fashion choices. Learn about sustainable fabrics, ethical brands, and how to extend the life of your clothes through proper care and repair. We'll also provide tips on how to shop secondhand, participate in clothing swaps, and reduce your overall fashion carbon footprint."
  },
  {
    title: "Style Guide",
    image: "/feature4.png",
    description: "Personal styling advice",
    fullContent: "The Style Guide feature offers personalized fashion advice tailored to your body type, skin tone, and personal preferences. Discover which cuts, styles, and colors work best for you. Get tips on how to dress for different occasions, from casual outings to formal events. Our style guide will help you build confidence in your fashion choices and develop a signature look that's uniquely you."
  },
  {
    title: "Color Matching",
    image: "/feature5.png",
    description: "Perfect color combinations",
    fullContent: "Our Color Matching feature helps you create harmonious and eye-catching color combinations in your outfits. Learn about color theory and how to use complementary, analogous, and triadic color schemes. Get suggestions for color pairings based on the items in your virtual closet, and discover new ways to mix and match your existing wardrobe for fresh, stylish looks."
  },
  {
    title: "Outfit Planning",
    image: "/feature6.png",
    description: "Plan your looks ahead",
    fullContent: "The Outfit Planning feature allows you to create and save outfit combinations for different occasions or days of the week. Use items from your virtual closet to put together looks in advance, saving you time and stress in your daily routine. You can also get outfit suggestions based on the weather forecast, your schedule, or specific events. Never worry about what to wear again!"
  }
]

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <NavBar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/image_virtual.jpeg"
          alt="Organized wardrobe background"
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover w-full h-full"
          priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Virtual Wardrobe Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Simplify Your Wardrobe, Redefine Your Style
          </p>
          <AnimatedButton size="lg" className="text-lg">
            Get Started
          </AnimatedButton>
        </div>
      </section>
      {/* Features Grid Section */}
      <section className="py-24 bg-[#9eb3a6]">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:scale-105 transition-transform duration-300 backdrop-blur-sm rounded-lg cursor-pointer"
                onClick={() => setSelectedFeature(feature)}>
                
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-full" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-lg text-center mb-4">{feature.description}</p>
                  <AnimatedButton variant="secondary" size="sm">
                    Learn More
                  </AnimatedButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white text-black">
          <DialogHeader>
            <DialogTitle>{selectedFeature?.title}</DialogTitle>
            <DialogDescription>{selectedFeature?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[calc(80vh-10rem)]">
            <div className="prose prose-sm max-w-none prose-headings:text-[#2F4F4F] prose-p:text-gray-600 prose-li:text-gray-600">
              <p>{selectedFeature?.fullContent}</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src="/aboutus.png"
                alt="Organized wardrobe"
                width={1200}
                height={200}
                className="object-cover" />
            </div>
            <Card className="p-8 shadow-xl bg-white/90 backdrop-blur-sm">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-8 text-[#2F4F4F]">About Us</h2>
                <p className="mb-6 text-gray-700">
                  StyleMate is your ultimate outfit suggestion app, designed to solve the everyday
                  dilemma of "What do I wear?" and the challenge of organizing your closet. We
                  understand how overwhelming it can be to manage a cluttered wardrobe and find
                  the perfect outfit for any occasion.
                </p>
                <p className="mb-6 text-gray-700">
                  Our app helps you save time, embrace sustainable fashion, and elevate your
                  style with personalized outfit recommendations tailored to your mood, events,
                  and preferences. From a virtual closet to color coordination tips and wardrobe
                  decluttering advice, StyleMate is here to simplify your fashion choices and
                  help you make the most of your wardrobe.
                </p>
                <p className="text-xl font-semibold text-[#2F4F4F]">
                  Join us to redefine your style journey—one outfit at a time!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Testimonials />
      <BlogSection />
      <WriteBlogSection />
      <Footer />
    </div>
  )
}

  