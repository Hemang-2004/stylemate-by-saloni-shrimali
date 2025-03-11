"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
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

export default function ReelsPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null);


  const reels = [
    {
      id: 1,
      username: "fashionista_emma",
      title: "5 Ways to Style a White Shirt",
      likes: 1243,
      comments: 89,
      thumbnail: "/image.png",
      videoUrl: "/placeholder.mp4",
    },
    {
      id: 2,
      username: "style_with_james",
      title: "Capsule Wardrobe Essentials",
      likes: 987,
      comments: 56,
      thumbnail: "/placeholder.svg?height=600&width=400&text=Reel 2",
      videoUrl: "/placeholder.mp4",
    },
    {
      id: 3,
      username: "trendy_taylor",
      title: "Summer to Fall Transition Outfits",
      likes: 2156,
      comments: 124,
      thumbnail: "/placeholder.svg?height=600&width=400&text=Reel 3",
      videoUrl: "/placeholder.mp4",
    },
    {
      id: 4,
      username: "fashion_forward",
      title: "Thrift Store Transformation",
      likes: 1876,
      comments: 103,
      thumbnail: "/placeholder.svg?height=600&width=400&text=Reel 4",
      videoUrl: "/placeholder.mp4",
    },
  ]

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handlePrevReel = () => {
    setCurrentReelIndex((prev) => (prev === 0 ? reels.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev === reels.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const currentReel = reels[currentReelIndex]

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <TopNav />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8 text-center">Style Reels</h1>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Reel Thumbnails */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#2F4F4F] mb-4">
                  {activeTab === "trending"
                    ? "Trending Reels"
                    : activeTab === "following"
                      ? "From People You Follow"
                      : "Saved Reels"}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {reels.map((reel, index) => (
                    <div
                      key={reel.id}
                      className={`cursor-pointer rounded-lg overflow-hidden relative ${
                        currentReelIndex === index ? "ring-2 ring-[#4A7A6F]" : ""
                      }`}
                      onClick={() => {
                        setCurrentReelIndex(index)
                        setIsPlaying(false)
                      }}
                    >
                      <div className="relative h-40">
                        <Image
                          src={reel.thumbnail || "/placeholder.svg"}
                          alt={reel.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white opacity-80" />
                        </div>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-xs font-medium text-[#4A7A6F] mb-1">@{reel.username}</p>
                        <p className="text-sm font-medium text-[#2F4F4F] truncate">{reel.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]">Browse More Reels</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Reel Player */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="bg-white shadow-md overflow-hidden">
              <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
                {/* Video Player */}
                <div className="absolute inset-0 flex items-center justify-center">
                <Image
  src={currentReel.thumbnail || "/image.png"}
  alt={currentReel.title}
  width={400} // Set explicit width
  height={600} // Set explicit height
  className="object-cover"
/>

                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={currentReel.thumbnail}
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => handleNextReel()}
                  >
                    <source src={currentReel.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Overlay Controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {/* Top Info */}
                  <div className="flex items-center">
                    <div className="bg-black/50 px-3 py-1 rounded-full text-white text-sm">@{currentReel.username}</div>
                  </div>

                  {/* Side Actions */}
                  <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
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
                  <div className="flex items-center justify-between">
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
                </div>

                {/* Mute Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-4 left-4 rounded-full bg-black/30 text-white hover:bg-black/50"
                  onClick={handleMuteToggle}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F]">{currentReel.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Discover how to create multiple stylish looks with items you already own. Perfect for refreshing your
                  wardrobe without shopping!
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-[#2F4F4F] mb-2">Featured Items</h4>
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex-shrink-0 w-16">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=100&width=100&text=Item ${item}`}
                            alt={`Featured item ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

