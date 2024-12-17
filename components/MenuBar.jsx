'use client'

import { useState } from "react"
import Link from "next/link"
import { Search, PenTool, Menu, Home, Video, Phone, ChevronDown, Shirt, Palette, Recycle, Trash2, FootprintsIcon, Users, UserPlus, HelpCircle } from 'lucide-react'
import { Logo } from "./logo"
import { Button } from "../src/components/ui/button"
import { Input } from "../src/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../src/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../src/components/ui/popover"

const features = [
  { name: "Personalized Outfit Suggestions", icon: Shirt },
  { name: "Colour Co-ordinations and styling tips", icon: Palette },
  { name: "Sustainable fashion", icon: Recycle },
  { name: "Wardrobe decluttering", icon: Trash2 },
  { name: "Virtual closet walk-through", icon: FootprintsIcon },
]

export function MenuBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    (<nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#E6EFE9]/90 backdrop-blur-md border-b border-[#2F4F4F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Features
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-white p-0">
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature.name}>
                      <Link
                        href={`#${feature.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center px-4 py-2 text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
                        <feature.icon className="mr-2 h-4 w-4" />
                        {feature.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/about" className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Video Briefing
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/blog" className="flex items-center">
                <PenTool className="mr-2 h-4 w-4" />
                Write and Read Blogs
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/testimonials" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Video Testimonial
              </Link>
            </Button>

            {/* <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/join-club" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                How StyleMate 
              </Link>
            </Button> */}

            <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/how-stylemate" className="flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Why&How StyleMate
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] hover:bg-[#E6EFE9]">
              <Link href="/contact" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>

            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)} />
              <Input
                type="search"
                placeholder="Search..."
                className={`pl-8 w-[200px] bg-white/50 border-[#2F4F4F]/30 placeholder-[#2F4F4F]/50 text-[#2F4F4F] transition-all duration-300 ${
                  isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`} />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#2F4F4F]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                  <div className="space-y-2">
                    <p className="font-medium text-lg text-[#2F4F4F] flex items-center">
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Features
                    </p>
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={`#${feature.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-[#2F4F4F] hover:text-[#4A7A6F] pl-6 flex items-center">
                        <feature.icon className="mr-2 h-4 w-4" />
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/about"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    Video Briefing
                  </Link>
                  <Link
                    href="/blog"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <PenTool className="mr-2 h-4 w-4" />
                    Blog
                  </Link>
                  <Link
                    href="/testimonials"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Testimonials
                  </Link>
                  <Link
                    href="/join-club"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Join the StyleMate Club
                  </Link>
                  <Link
                    href="/how-stylemate"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    How StyleMate
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                  <div className="pt-4 relative">
                    <Search
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full bg-white/50 border-[#2F4F4F]/30 placeholder-[#2F4F4F]/50 text-[#2F4F4F] pl-8" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>)
  );
}

