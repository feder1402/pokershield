import { useState } from "react"
import { useRoomStore } from "@/lib/room-store"
import { useNavigate } from "react-router-dom"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"
import { CreateRoomCard } from "./CreateRoomCard"
import { FeaturesSection } from "./FeaturesSection"
import { HowItWorks } from "./HowItWorks"
import { Footer } from "./Footer"

export default function HomePage() {
  const [isCreating, setIsCreating] = useState(false)

  const { createRoom } = useRoomStore()
  const navigate = useNavigate()

  const handleCreateRoom = () => {
    setIsCreating(true)
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    createRoom(roomId)

    setTimeout(() => {
      navigate(`/room/${roomId}`)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <HeroSection>
          <CreateRoomCard
            onCreateRoom={handleCreateRoom}
            isCreating={isCreating}
          />
          <FeaturesSection />
          <HowItWorks />
        </HeroSection>
      </main>

      <Footer />
    </div>
  )
}
