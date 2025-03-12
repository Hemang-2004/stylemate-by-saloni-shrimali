"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Upload, Camera, Plus, X } from "lucide-react"

interface Measurements {
  height: string
  weight: string
  waist: string
  neck: string
  unit: "metric" | "imperial"
}

interface Dress {
  id: number
  name: string
  image: string
  category: string
}

const defaultMeasurements: Measurements = {
  height: "159", // cm
  weight: "52", // kg
  waist: "30", // cm
  neck: "20", // cm
  unit: "metric",
}

const moodOutfitMap = {
  "Happy & Playful": ["Summer Dress", "Modern Party Dress", "Festive Wear"],
  "Feeling Stylish": ["Gown Dress", "Suits/Formals"],
  Trendy: ["Cocktail Dress", "Modern Party Dress"],
  Graceful: ["Traditional Party Dress", "Festive Wear"],
  Professional: ["Suits/Formals", "Winter Dress"],
  Cozy: ["Summer Dress", "Winter Dress"],
  Festive: ["Festive Wear", "Traditional Party Dress"],
}

const dresses: Dress[] = [
  { id: 1, name: "Summer Dress", image: "/im2.webp?height=400&width=200", category: "Casual" },
  { id: 2, name: "Gown Dress", image: "/gown.jpg?height=400&width=200", category: "Formal" },
  { id: 3, name: "Cocktail Dress", image: "/cock.jpeg?height=400&width=200", category: "Party" },
  { id: 4, name: "Modern Party Dress", image: "/im4.jpeg?height=400&width=200", category: "Party" },
  { id: 5, name: "Traditional Party Dress", image: "/g3.jpg?height=400&width=200", category: "Traditional" },
  { id: 6, name: "Suits/Formals", image: "/im3.jpeg?height=400&width=200", category: "Professional" },
  { id: 7, name: "Winter Dress", image: "/im5.jpeg?height=400&width=200", category: "Seasonal" },
  { id: 8, name: "Festive Wear", image: "/im6.jpeg?height=400&width=200", category: "Festival" },
]

export default function VirtualTryoutsPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [selectedOutfit, setSelectedOutfit] = useState<Dress | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [measurements, setMeasurements] = useState<Measurements>(defaultMeasurements)
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [userDresses, setUserDresses] = useState<Dress[]>(dresses)
  const [recommendedDresses, setRecommendedDresses] = useState<Dress[]>([])
  const [showForm, setShowForm] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmitForm = () => {
    if (selectedMood) {
      const recommended = userDresses.filter((dress) => moodOutfitMap[selectedMood].includes(dress.name))
      setRecommendedDresses(recommended)
      setShowForm(false)
    }
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError("Could not access camera. Please ensure you have granted camera permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const photoData = canvasRef.current.toDataURL("image/png")
        setPhoto(photoData)
        stopCamera()
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAddNewDress = (name: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newDress: Dress = {
        id: userDresses.length + 1,
        name,
        image: e.target?.result as string,
        category: "Custom",
      }
      setUserDresses([...userDresses, newDress])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE6DC] via-[#F5E1C8] to-[#EADBC8]">
      <TopNav />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-4">Virtual Tryouts</h1>
        <p className="text-gray-600 mb-8">
          Try on different outfits virtually and see how they look on you before making a decision.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Photo Upload/Camera */}
          <Card className="lg:col-span-1 bg-[#E6F7E6] border border-black shadow-md rounded-lg h-[500px] overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              {!photo ? (
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 rounded-none">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="camera">Camera</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="flex-grow flex items-center justify-center p-4">
                    <div
                      className="border-2 border-dashed border-[#9eb3a6] rounded-lg p-8 text-center w-full h-full flex flex-col items-center justify-center cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <Upload className="mx-auto h-16 w-16 text-[#4A7A6F] mb-4" />
                      <h3 className="text-xl font-medium text-[#2F4F4F] mb-2">Upload Your Photo</h3>
                      <p className="text-gray-500 mb-6">Drag and drop or click to browse</p>
                      <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F] cursor-pointer">Choose File</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="camera" className="flex-grow flex flex-col p-4">
                    {cameraError && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{cameraError}</div>}

                    {!stream ? (
                      <div
                        className="border-2 border-dashed border-[#9eb3a6] rounded-lg p-8 text-center w-full h-full flex flex-col items-center justify-center cursor-pointer"
                        onClick={startCamera}
                      >
                        <Camera className="mx-auto h-16 w-16 text-[#4A7A6F] mb-4" />
                        <h3 className="text-xl font-medium text-[#2F4F4F] mb-2">Use Camera</h3>
                        <p className="text-gray-500 mb-6">Take a photo using your device's camera</p>
                        <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]">Start Camera</Button>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div className="relative flex-grow rounded-lg overflow-hidden bg-black">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
                          />
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" onClick={stopCamera}>
                            Cancel
                          </Button>
                          <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]" onClick={takePhoto}>
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="relative h-full w-full">
                  <Image src={photo || "/placeholder.svg"} alt="Captured photo" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <Button className="w-full bg-[#4A7A6F] hover:bg-[#2F4F4F]" onClick={() => setPhoto(null)}>
                      Take New Photo
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setPhoto(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Center Panel - Measurements Form or Recommended Dresses */}
          <Card className="lg:col-span-1 bg-[#E6F7E6] border border-black shadow-md rounded-lg h-[500px]">
            <CardContent className="p-4 h-full">
              {showForm ? (
                <div className="space-y-2 overflow-y-auto pr-2 h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-medium text-[#2F4F4F]">Your Measurements</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#4A7A6F] hover:bg-[#2F4F4F] text-white"
                      onClick={() => setMeasurements(defaultMeasurements)}
                    >
                      Put Default
                    </Button>
                  </div>

                  <div className="flex justify-end mb-1">
                    <Select
                      value={measurements.unit}
                      onValueChange={(value: "metric" | "imperial") =>
                        setMeasurements((prev) => ({ ...prev, unit: value }))
                      }
                    >
                      <SelectTrigger className="w-[100px] h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric</SelectItem>
                        <SelectItem value="imperial">Imperial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm">Height ({measurements.unit === "metric" ? "cm" : "inches"})</Label>
                    <Input
                      type="number"
                      value={measurements.height}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, height: e.target.value }))}
                      className="h-8"
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm">Weight ({measurements.unit === "metric" ? "kg" : "lbs"})</Label>
                    <Input
                      type="number"
                      value={measurements.weight}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, weight: e.target.value }))}
                      className="h-8"
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm">Waist ({measurements.unit === "metric" ? "cm" : "inches"})</Label>
                    <Input
                      type="number"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, waist: e.target.value }))}
                      className="h-8"
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm">Neck ({measurements.unit === "metric" ? "cm" : "inches"})</Label>
                    <Input
                      type="number"
                      value={measurements.neck}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, neck: e.target.value }))}
                      className="h-8"
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm">Mood</Label>
                    <Select onValueChange={setSelectedMood} value={selectedMood}>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Happy & Playful">Happy & Playful</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Graceful">Graceful</SelectItem>
                        <SelectItem value="Cozy">Cozy</SelectItem>
                        <SelectItem value="Festive">Festive</SelectItem>
                        <SelectItem value="Feeling Stylish">Feeling Stylish</SelectItem>
                        <SelectItem value="Trendy">Trendy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-[#4A7A6F] hover:bg-[#2F4F4F] mt-2"
                    onClick={handleSubmitForm}
                    disabled={!selectedMood}
                  >
                    Get Recommendations
                  </Button>
                </div>
              ) : (
                <div className="overflow-y-auto pr-2 h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-medium text-[#2F4F4F]">Recommended for You</h3>
                    <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                      Back to Form
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {recommendedDresses.map((dress) => (
                      <div
                        key={dress.id}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedOutfit?.id === dress.id
                            ? "border-[#4A7A6F] scale-105"
                            : "border-transparent hover:border-[#9eb3a6]"
                        }`}
                        onClick={() => setSelectedOutfit(dress)}
                      >
                        <div className="relative h-28">
                          <Image
                            src={dress.image || "/placeholder.svg"}
                            alt={dress.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-1 text-center">
                          <p className="font-medium text-sm text-[#2F4F4F]">{dress.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Wardrobe */}
          <Card className="lg:col-span-1 bg-[#E6F7E6] border border-black shadow-md rounded-lg h-[500px]">
            <CardContent className="p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-[#2F4F4F]">Your Wardrobe</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#4A7A6F] hover:bg-[#2F4F4F]">
                      <Plus className="h-3 w-3 mr-1" />
                      Add New Dress
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Dress</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dress-name">Dress Name</Label>
                        <Input id="dress-name" placeholder="Enter dress name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dress-photo">Photo</Label>
                        <Input id="dress-photo" type="file" accept="image/*" />
                      </div>
                    </div>
                    <Button className="w-full bg-[#4A7A6F] hover:bg-[#2F4F4F]">Add to Wardrobe</Button>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2 h-[calc(100%-40px)]">
                {userDresses.map((dress) => (
                  <div
                    key={dress.id}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedOutfit?.id === dress.id
                        ? "border-[#4A7A6F] scale-105"
                        : "border-transparent hover:border-[#9eb3a6]"
                    }`}
                    onClick={() => setSelectedOutfit(dress)}
                  >
                    <div className="relative h-28">
                      <Image src={dress.image || "/placeholder.svg"} alt={dress.name} fill className="object-cover" />
                    </div>
                    <div className="p-1 text-center">
                      <p className="font-medium text-sm text-[#2F4F4F]">{dress.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

