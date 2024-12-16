import { MenuBar } from "../../components/MenuBar"
import { Footer } from "../../components/footer"

export default function AboutPage() {
  return (
    (<div className="min-h-screen bg-gray-50 flex flex-col">
      <MenuBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-[#2F4F4F]">About Us</h1>
          <div
            className="relative w-full h-0 pb-[56.25%] mb-8 rounded-lg overflow-hidden">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              poster="/placeholder.svg?height=1080&width=1920">
              <source src="/aboutus.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                StyleMate is your ultimate outfit suggestion app, designed to solve the everyday
                dilemma of "What do I wear?" and the challenge of organizing your closet. We
                understand how overwhelming it can be to manage a cluttered wardrobe and find
                the perfect outfit for any occasion.
              </p>
              <p className="mb-6">
                Our app helps you save time, embrace sustainable fashion, and elevate your
                style with personalized outfit recommendations tailored to your mood, events,
                and preferences. From a virtual closet to color coordination tips and wardrobe
                decluttering advice, StyleMate is here to simplify your fashion choices and
                help you make the most of your wardrobe.
              </p>
              <p className="text-xl font-semibold text-[#2F4F4F] text-center">
                Join us to redefine your style journey—one outfit at a time!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>)
  );
}

