import Socialas from "@/components/Social-Links/social-links"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SkillsSection from "@/Skills/skills"

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr_350px] gap-4 max-w-7xl mx-auto">
        {/* Left Panel */}
        <Card className="bg-zinc-900 text-white p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <h2 className="text-xl">Your Name</h2>
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4FqYHnVj60HbYispXMDZd0ToegLsm9.png"
                alt="Profile"
                className="object-cover"
              />
            </div>
            <p className="text-gray-400">
              Passionate about creating and designing websites with the best engaging interfaces.
            </p>
          </div>
          <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
            Download CV
          </Button>
          <SkillsSection />
        </Card>

        {/* Center Panel */}
        <Card className="bg-red-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4FqYHnVj60HbYispXMDZd0ToegLsm9.png"
              alt="Large Profile"
              
              className="object-cover"
            />
          </div>
          <div className="relative h-full flex flex-col justify-end p-8 bg-gradient-to-t from-black/50 to-transparent">
            <div className="space-y-4">
              <h1 className="text-5xl font-light">Your Name</h1>
              <div className="flex gap-4">
                <Button variant="secondary">Projects</Button>
                <Button variant="outline" className="text-white border-white hover:text-white">
                  Services
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Panel */}
        <Card className="bg-zinc-900 text-white p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-light">
              Your Name - Web Designer & Developer
            </h2>
            <p className="text-gray-400">
              Located in Your Location, I have several years of experience
              in web development and design, carrying out several successful projects.
            </p>
          </div>
          <Socialas />
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4FqYHnVj60HbYispXMDZd0ToegLsm9.png"
                alt="Profile"
                
                className="object-cover"
              />
            </div>
            <p className="text-gray-400">
              I don't write messages on social networks, send me an
              email and I'll answer you.
            </p>
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
            Contact Me
          </Button>
        </Card>
      </div>
    </main>
  )
}

