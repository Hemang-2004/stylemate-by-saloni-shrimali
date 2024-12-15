'use client'

import Link from "next/link"

import { useState } from "react"
import { Search, PenTool, Menu } from 'lucide-react';
import { Logo } from "./logo"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const features = [
  "Personalized Outfit Suggestions",
  "Colour Co-ordinations and styling tips",
  "Sustainable fashion",
  "Wardrobe decluttering",
  "Virtual closet walk-through",
]

export function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    (<nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#E6EFE9]/90 backdrop-blur-md border-b border-[#2F4F4F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[#2F4F4F] hover:text-[#4A7A6F] bg-transparent">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white">
                      {features.map((feature) => (
                        <li key={feature}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`#${feature.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              {feature}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/about" className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium">
              Video Briefing
            </Link>
            <Link
              href="/blog"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium flex items-center gap-2">
              <PenTool size={18} />
              Blog
            </Link>
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] bg-white/50 border-[#2F4F4F]/30 placeholder-[#2F4F4F]/50 text-[#2F4F4F]" />
            </div>
            <Link
              href="/contact"
              className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium">
              Contact Us
            </Link>
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
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg">
                    Home
                  </Link>
                  <div className="space-y-2">
                    <p className="font-medium text-lg text-[#2F4F4F]">Features</p>
                    {features.map((feature) => (
                      <Link
                        key={feature}
                        href={`#${feature.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-[#2F4F4F] hover:text-[#4A7A6F] pl-4">
                        {feature}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/about"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg">
                    About Us
                  </Link>
                  <Link
                    href="/blog"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg flex items-center gap-2">
                    <PenTool size={18} />
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[#2F4F4F] hover:text-[#4A7A6F] font-medium text-lg">
                    Contact Us
                  </Link>
                  <div className="pt-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full bg-white/50 border-[#2F4F4F]/30 placeholder-[#2F4F4F]/50 text-[#2F4F4F]" />
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

