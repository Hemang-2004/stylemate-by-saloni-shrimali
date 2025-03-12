"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tally3, Sparkles, TrendingUp, Clock, Menu, X, Home, User, LayoutDashboard } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function TopNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-5" />,
    },
    {
      name: "Virtual Tryouts",
      href: "/dashboard/virtual-tryouts",
      icon: <Tally3 className="h-5 w-5 mr-5" />,
    },
    {
      name: "Ask Me Anything",
      href: "/dashboard/ask-me-anything",
      icon: <Sparkles className="h-5 w-5 mr-5" />,
    },
    {
      name: "Reels",
      href: "/dashboard/reels",
      icon: <TrendingUp className="h-5 w-5 mr-5" />,
    },
    {
      name: "Anything New?",
      href: "/dashboard/anything-new",
      icon: <Clock className="h-5 w-5 mr-5" />,
    },
  ]

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 bg-[#EFD8BE] transition-all duration-300 ${
    isScrolled ? "bg-[#EFD8BE]/70 backdrop-blur-md shadow-md" : "bg-[#EFD8BE]"
  }`}
>



      <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
  {/* Logo */}
  <Link href="/" className="flex items-center space-x-2">
    <img src="/bo.png" alt="Logo" className="h-14 w-15" /> {/* Replace with actual logo path */}
    <span className="text-2xl font-bold text-[#2F4F4F]">StyleMate</span>
  </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href ? "bg-[#2F4F4F] text-white" : "text-[#2F4F4F] hover:bg-[#9eb3a6]/20"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-[#9eb3a6] text-white">SS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Home</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F5F5DC] border-t border-[#9eb3a6]/20 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-[#2F4F4F] text-white" : "text-[#2F4F4F] hover:bg-[#9eb3a6]/20"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

