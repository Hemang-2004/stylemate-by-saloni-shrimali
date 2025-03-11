"use client"

import type React from "react"

import { useState, useRef, useEffect, Suspense } from "react"
import Image from "next/image"
import { TopNav } from "../../../components/top-nav"
import { Footer } from "../../../components/footer"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Upload, Camera, Rotate3D, Save } from "lucide-react"
import { Canvas } from "@react-three/fiber"
// import * from "THREE";
import * as THREE from "three"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"

function Model({ selectedOutfit }) {
  const { nodes, materials } = useGLTF(
    "/mannequin.glb",
  )

  return (
    <group position={[0, -1, 0]} scale={[1, 1, 1]}>
      {nodes.Armature && <primitive object={nodes.Armature} />}
      {/* <skinnedMesh geometry={nodes.Body.geometry} material={materials.Skin} skeleton={nodes.Body.skeleton} /> */}
      {nodes.Body instanceof THREE.Mesh && (
  <skinnedMesh
    geometry={nodes.Body.geometry}
    material={materials.Skin}
    skeleton={nodes.Body.skeleton}
  />
)}

      {/* Selected outfit visualization */}
      {selectedOutfit && (
  <group>
    {selectedOutfit.category === "Dress" && nodes.Dress instanceof THREE.SkinnedMesh && (
      <primitive
        object={nodes.Dress}
        material-color={getOutfitColor(selectedOutfit)}
      />
    )}

    {selectedOutfit.category === "Top" && nodes.Top instanceof THREE.SkinnedMesh && (
      <primitive
        object={nodes.Top}
        material-color={getOutfitColor(selectedOutfit)}
      />
    )}

    {selectedOutfit.category === "Bottom" && nodes.Bottom instanceof THREE.SkinnedMesh && (
      <primitive
        object={nodes.Bottom}
        material-color={getOutfitColor(selectedOutfit)}
      />
    )}
  </group>
)}


    </group>
  )
}

// Helper function to get color based on outfit name
function getOutfitColor(outfit) {
  if (outfit.name.includes("White")) return "#ffffff"
  if (outfit.name.includes("Black")) return "#222222"
  if (outfit.name.includes("Blue")) return "#3b82f6"
  if (outfit.name.includes("Red")) return "#ef4444"
  if (outfit.name.includes("Green")) return "#22c55e"
  return "#f97316" // Default orange
}

const outfits = [
  {
    id: 1,
    name: "White Summer Dress",
    category: "Dress",
    image: "/placeholder.svg?height=200&width=200&text=White%20Dress",
  },
  {
    id: 2,
    name: "Black Evening Gown",
    category: "Dress",
    image: "/placeholder.svg?height=200&width=200&text=Black%20Dress",
  },
  {
    id: 3,
    name: "Blue Cocktail Dress",
    category: "Dress",
    image: "/placeholder.svg?height=200&width=200&text=Blue%20Dress",
  },
  {
    id: 4,
    name: "Red Party Dress",
    category: "Dress",
    image: "/placeholder.svg?height=200&width=200&text=Red%20Dress",
  },
]

export default function VirtualTryoutsPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [selectedOutfit, setSelectedOutfit] = useState(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  // Camera functions
  const startCamera = async () => {
    try {
      setCameraError(null)

      // Request camera access with specific constraints
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

        // Wait for video to be ready before playing
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve
          }
        })

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
        // Set canvas dimensions to match video
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight

        // Draw the video frame to canvas
        context.drawImage(videoRef.current, 0, 0)

        // Convert to data URL
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

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <TopNav />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-4">Virtual Tryouts</h1>
        <p className="text-gray-600 mb-8">
          Try on different outfits virtually and see how they look on you before making a decision.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Photo Upload/Camera */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="camera">Camera</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div className="border-2 border-dashed border-[#9eb3a6] rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Upload className="mx-auto h-12 w-12 text-[#4A7A6F] mb-4" />
                    <h3 className="text-lg font-medium text-[#2F4F4F] mb-2">Upload Your Photo</h3>
                    <p className="text-gray-500 mb-4">Drag and drop or click to browse</p>
                    <label htmlFor="photo-upload">
                      <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F] cursor-pointer">Choose File</Button>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="camera" className="mt-0">
                  <div className="space-y-4">
                    {cameraError && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{cameraError}</div>}

                    {!stream ? (
                      <div className="border-2 border-dashed border-[#9eb3a6] rounded-lg p-8 text-center">
                        <Camera className="mx-auto h-12 w-12 text-[#4A7A6F] mb-4" />
                        <h3 className="text-lg font-medium text-[#2F4F4F] mb-2">Use Camera</h3>
                        <p className="text-gray-500 mb-4">Take a photo using your device's camera</p>
                        <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]" onClick={startCamera}>
                          Start Camera
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between">
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
                  </div>
                </TabsContent>
              </Tabs>

              {photo && (
                <div className="mt-4">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image src={photo || "/placeholder.svg"} alt="Captured photo" fill className="object-cover" />
                  </div>
                  <Button className="w-full mt-4 bg-[#4A7A6F] hover:bg-[#2F4F4F]" onClick={() => setPhoto(null)}>
                    Take New Photo
                  </Button>
                </div>
              )}

              {/* Tips Section */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-[#2F4F4F] mb-4">Tips for Best Results</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#4A7A6F] mr-2">1.</span>
                    Stand against a plain background
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4A7A6F] mr-2">2.</span>
                    Ensure good lighting
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4A7A6F] mr-2">3.</span>
                    Face the camera directly
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4A7A6F] mr-2">4.</span>
                    Wear fitted clothing for accurate sizing
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Center Panel - 3D Preview */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                <Suspense fallback={null}>
                <Canvas shadows camera={{ position: [0, 0, 3], fov: 50 }}>

                    <color attach="background" args={["#f8f8f8"]} />
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Suspense fallback={null}>
                      <Model selectedOutfit={selectedOutfit} />
                      <Environment preset="studio" />
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial transparent opacity={0.2} />
                      </mesh>
                    </Suspense>
                    <OrbitControls
                      makeDefault
                      minPolarAngle={0}
                      maxPolarAngle={Math.PI / 2}
                      enableZoom={true}
                      enablePan={true}
                      zoomSpeed={0.5}
                    />
                    </Canvas>
              </Suspense>

                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Rotate3D className="h-4 w-4 mr-2" />
                    Rotate View
                  </Button>
                  <Button className="bg-[#4A7A6F] hover:bg-[#2F4F4F]" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Look
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Outfit Selection */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-[#2F4F4F] mb-4">Wardrobe Items</h3>

              <div className="grid grid-cols-2 gap-4">
                {outfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedOutfit?.id === outfit.id
                        ? "border-[#4A7A6F] scale-105"
                        : "border-transparent hover:border-[#9eb3a6]"
                    }`}
                    onClick={() => setSelectedOutfit(outfit)}
                  >
                    <div className="relative h-40">
                      <Image src={outfit.image || "/placeholder.svg"} alt={outfit.name} fill className="object-cover" />
                    </div>
                    <div className="p-2 text-center">
                      <p className="font-medium text-[#2F4F4F]">{outfit.name}</p>
                      <p className="text-sm text-gray-500">{outfit.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-[#4A7A6F] hover:bg-[#2F4F4F]">Browse More Items</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

