import { useState } from "react"
import { useRoomStore } from "@/lib/room-store"
import { useNavigate } from "react-router-dom"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"
import { ActionCards } from "./ActionCards"
import { FeaturesSection } from "./FeaturesSection"
import { HowItWorks } from "./HowItWorks"
import { Footer } from "./Footer"

export default function HomePage() {
  const [roomIdInput, setRoomIdInput] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const { createRoom, getRoom } = useRoomStore()
  const navigate = useNavigate()

  const handleCreateRoom = () => {
    setIsCreating(true)
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    createRoom(roomId)

    setTimeout(() => {
      navigate(`/room/${roomId}`)
    }, 100)
  }

  const handleJoinRoom = () => {
    if (!roomIdInput.trim()) return

    const roomId = roomIdInput.trim().toUpperCase()
    const room = getRoom(roomId)

    if (!room) {
      alert("Room not found. Please check the room ID.")
      return
    }

    navigate(`/room/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <HeroSection>
          <ActionCards
            roomIdInput={roomIdInput}
            setRoomIdInput={setRoomIdInput}
            onJoinRoom={handleJoinRoom}
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
