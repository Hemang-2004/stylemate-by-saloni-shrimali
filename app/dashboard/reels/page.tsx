"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Featured items that will be randomly shown with reels
const featuredItems = [
  { id: 1, name: "White Button-Up Shirt", image: "/t2.jpeg?height=80&width=80&text=Item 1" },
  { id: 2, name: "Gold Hoop Earrings", image: "/t1.jpeg?height=80&width=80&text=Item 2" },
  { id: 3, name: "Beige Trench Coat", image: "/t6.jpeg?height=80&width=80&text=Item 3" },
  { id: 4, name: "Black Slim-Fit Jeans", image: "/t7.jpeg?height=80&width=80&text=Item 4" },
  { id: 5, name: "Red Silk Blouse", image: "/t3.jpeg?height=80&width=80&text=Item 5" },
  { id: 6, name: "Navy Blue Blazer", image: "/t4.jpeg?height=80&width=80&text=Item 6" },
  { id: 7, name: "Khaki Chinos", image: "/t5.jpeg?height=80&width=80&text=Item 7" },
]

// Get 2 random items from the featured items array
const getRandomItems = () => {
  const shuffled = [...featuredItems].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
}

// Reel data for each category
const reelCategories = {
  trending: [
    {
      id: 1,
      username: "fashionista_emma",
      title: "Grwm for a vacation",
      likes: 1243,
      comments: 89,
      thumbnail: "/v1im1.jpg?height=200&width=120&text=White Shirt",
      videoUrl: "/vid1.mp4",
      description:
        "Discover how to create multiple stylish looks with me",
      featuredItems: getRandomItems(),
    },
    {
      id: 2,
      username: "style_with_james",
      title: "How to dress rich ",
      likes: 987,
      comments: 56,
      thumbnail: "/v2im2.jpg?height=200&width=120&text=Capsule",
      videoUrl: "/vid2.mp4",
      description:
        "Build a versatile wardrobe with these timeless pieces that mix and match perfectly for endless outfit combinations.",
      featuredItems: getRandomItems(),
    },
    {
      id: 3,
      username: "trendy_taylor",
      title: "Summer to Fall Transition Outfits",
      likes: 2156,
      comments: 124,
      thumbnail: "/v3im3.jpg?height=200&width=120&text=Transition",
      videoUrl: "/vid3.mp4",
      description:
        "Learn how to transition your summer favorites into fall with simple layering techniques and accessories.",
      featuredItems: getRandomItems(),
    },
    {
      id: 4,
      username: "fashion_forward",
      title: "Thrift Store Transformation",
      likes: 1876,
      comments: 103,
      thumbnail: "/v4im4.jpg?height=200&width=120&text=Thrift",
      videoUrl: "/vid4.mp4", // Using vid1 as fallback
      description:
        "Watch me transform thrifted finds into trendy, unique pieces that look designer but cost a fraction of the price.",
      featuredItems: getRandomItems(),
    },
  ],
  following: [
    {
      id: 5,
      username: "sustainable_sarah",
      title: "Trendy outfits",
      likes: 1532,
      comments: 97,
      thumbnail: "/v5im5.jpg?height=200&width=120&text=Eco",
      videoUrl: "/vid5.mp4", // Using vid2 as fallback
      description:
        "Simple Ways to look elegant on today's trendy outfits.",
      featuredItems: getRandomItems(),
    },
    {
      id: 6,
      username: "ABEL MARA",
      title: "Bold Fashion",
      likes: 1089,
      comments: 72,
      thumbnail: "/v6im6.jpg?height=200&width=120&text=Color",
      videoUrl: "/vid6.mp4", // Using vid3 as fallback
      description:
        "Understanding how to dress bold ",
      featuredItems: getRandomItems(),
    },
    {
      id: 7,
      username: "accessory_queen",
      title: "Style it together",
      likes: 2345,
      comments: 156,
      thumbnail: "/v7im7.jpg?height=200&width=120&text=Accessories",
      videoUrl: "/vid7.mp4", // Using vid1 as fallback
      description:
        "The right accessories can transform even the simplest outfit. Check out these styling tricks to elevate your look.",
      featuredItems: getRandomItems(),
    },
    {
      id: 8,
      username: "pattern_pro",
      title: "Recreating Pinterest Outfits",
      likes: 1765,
      comments: 118,
      thumbnail: "/v8im8.jpg?height=200&width=120&text=Patterns",
      videoUrl: "/vid8.mp4", // Using vid2 as fallback
      description:
        "Don't be afraid to mix patterns! Learn the rules for combining different prints for a bold, fashion-forward look.",
      featuredItems: getRandomItems(),
    },
  ],
  saved: [
    {
      id: 9,
      username: "office_style",
      title: "Defining the odds",
      likes: 1876,
      comments: 134,
      thumbnail: "/v9im9.jpg?height=200&width=120&text=Work",
      videoUrl: "/vid9.mp4", // Using vid3 as fallback
      description:
        "Join with me as I break societial rukes",
      featuredItems: getRandomItems(),
    },
    {
      id: 10,
      username: "body_positive_fashion",
      title: "How to turn a basic button down to a cute top",
      likes: 2198,
      comments: 187,
      thumbnail: "/v10im10.jpg?height=200&width=120&text=Body Type",
      videoUrl: "/vid10.mp4", // Using vid1 as fallback
      description:
        "Learn how to highlight your best features and create balanced proportions with these body-positive styling tips.",
      featuredItems: getRandomItems(),
    },
    {
      id: 11,
      username: "budget_stylist",
      title: "Luxury Looks on a Budget",
      likes: 3021,
      comments: 215,
      thumbnail: "/v11im11.jpg?height=200&width=120&text=Budget",
      videoUrl: "/vid11.mp4", // Using vid2 as fallback
      description:
        "You don't need to spend a fortune to look expensive. These budget-friendly styling tricks will elevate your entire wardrobe.",
      featuredItems: getRandomItems(),
    },
    {
      id: 12,
      username: "seasonal_stylist",
      title: "Winter Layering Guide",
      likes: 1654,
      comments: 92,
      thumbnail: "/v12im12.jpg?height=200&width=120&text=Winter",
      videoUrl: "/vid12.mp4", // Using vid3 as fallback
      description:
        "Stay warm without sacrificing style with these clever layering techniques that work for any winter occasion.",
      featuredItems: getRandomItems(),
    },
  ],
}

export default function ReelsPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // Default to muted
  const [isLoading, setIsLoading] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Get the current category's reels
  const currentCategoryReels = reelCategories[activeTab as keyof typeof reelCategories]
  const currentReel = currentCategoryReels[currentReelIndex]

  // Reset state when changing tabs or reels
  useEffect(() => {
    setCurrentReelIndex(0)
    setIsPlaying(false)
    setIsLoading(true)
    setVideoError(false)
  }, [activeTab])

  // Reset loading state when changing reels
  useEffect(() => {
    setIsLoading(true)
    setVideoError(false)

    // Auto-play when video is loaded
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [currentReelIndex, activeTab])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err)
          setVideoError(true)
        })
      }
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handlePrevReel = () => {
    setCurrentReelIndex((prev) => (prev === 0 ? currentCategoryReels.length - 1 : prev - 1))
  }

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev === currentCategoryReels.length - 1 ? 0 : prev + 1))
  }

  const handleVideoLoaded = () => {
    setIsLoading(false)
    // Auto-play when video is loaded
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Error auto-playing video:", err)
        setVideoError(true)
      })
    }
  }

  const handleVideoError = () => {
    setVideoError(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <TopNav />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8 text-center">Style Reels</h1>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Reel Categories and Thumbnails */}
          <div className="lg:w-1/3">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
            </Tabs>

            <h2 className="text-xl font-semibold text-[#2F4F4F] mb-4">
              {activeTab === "trending"
                ? "Trending Reels"
                : activeTab === "following"
                  ? "From People You Follow"
                  : "Saved Reels"}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {currentCategoryReels.map((reel, index) => (
                <div
                  key={reel.id}
                  className={`cursor-pointer rounded-lg overflow-hidden relative ${
                    currentReelIndex === index ? "ring-2 ring-[#4A7A6F]" : ""
                  }`}
                  onClick={() => {
                    setCurrentReelIndex(index)
                  }}
                >
                  <div className="relative h-32">
                    <Image src={reel.thumbnail || "/placeholder.svg"} alt={reel.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium text-[#4A7A6F] truncate">@{reel.username}</p>
                    <p className="text-sm font-medium text-[#2F4F4F] truncate">{reel.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]">Browse More Reels</Button>
            </div>
          </div>

          {/* Right Panel - Phone-style Reel Player */}
          <div className="lg:w-2/3">
            <div className="relative mx-auto" style={{ maxWidth: "360px" }}>
              {/* Phone Frame */}
              <div
                className="relative rounded-[36px] overflow-hidden bg-black border-8 border-black shadow-xl"
                style={{ height: "680px" }}
              >
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-2 bg-black text-white text-xs">
                  <span>9:41</span>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-black rounded-b-xl"></div>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Reel Content */}
                <div className="relative h-full bg-black">
                  {/* Video Player */}
                  <div className="absolute inset-0 z-10">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                      </div>
                    )}

                    {videoError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 p-4">
                        <p className="text-white text-center mb-4">Unable to load video. Please try again.</p>
                        <Button
                          className="bg-[#4A7A6F] hover:bg-[#2F4F4F]"
                          onClick={() => {
                            setVideoError(false)
                            setIsLoading(true)
                            if (videoRef.current) {
                              videoRef.current.load()
                            }
                          }}
                        >
                          Retry
                        </Button>
                      </div>
                    )}

                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      poster={currentReel.thumbnail}
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onLoadedData={handleVideoLoaded}
                      onError={handleVideoError}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={handleNextReel}
                    >
                      <source src={currentReel.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Username */}
                  <div className="absolute top-8 left-4 z-20 bg-black/50 px-3 py-1 rounded-full">
                    <span className="text-white text-sm">@{currentReel.username}</span>
                  </div>

                  {/* Side Actions */}
                  <div className="absolute right-4 bottom-32 flex flex-col space-y-6 z-20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                    >
                      <Heart className="h-6 w-6" />
                      <span className="text-xs mt-1">{currentReel.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                    >
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-xs mt-1">{currentReel.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                    >
                      <Share2 className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                    >
                      <Bookmark className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-20 left-0 right-0 flex items-center justify-between px-4 z-20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                      onClick={handlePrevReel}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white hover:bg-black/50"
                      onClick={handleNextReel}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Mute Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-20 left-4 rounded-full bg-black/30 text-white hover:bg-black/50 z-20"
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  {/* Reel Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4 z-20">
                    <h3 className="text-lg font-semibold text-white">{currentReel.title}</h3>
                    <p className="text-sm text-white/80 mt-1 line-clamp-2">{currentReel.description}</p>

                    {/* Featured Items */}
                    <div className="mt-3">
                      <h4 className="text-xs font-medium text-white/90 mb-2">Featured Items</h4>
                      <div className="flex space-x-3">
                        {currentReel.featuredItems.map((item) => (
                          <div key={item.id} className="flex-shrink-0">
                            <div className="relative h-12 w-12 rounded-md overflow-hidden border border-white/30">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Button/Indicator */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

