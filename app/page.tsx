"use client"

import { useState } from "react"
import { Shield, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRoomStore } from "@/lib/room-store"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const [roomIdInput, setRoomIdInput] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const { createRoom, getRoom } = useRoomStore()
  const router = useRouter()

  const handleCreateRoom = () => {
    setIsCreating(true)
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    createRoom(roomId)

    setTimeout(() => {
      router.push(`/room/${roomId}`)
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

    router.push(`/room/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PokerShield</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <ThemeToggle />
          </nav>
          {/* Mobile theme toggle */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full mb-4">
              Planning Poker for Agile Teams
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Collaborative estimation
            <br />
            <span className="text-muted-foreground">made simple</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
            Empower your agile team to estimate user stories collaboratively with seamless planning poker sessions. No
            sign-ups required.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            <Card className="p-6 hover:bg-accent/50 transition-colors">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-3">Join Existing Room</h3>
                <p className="text-muted-foreground mb-4">Enter a room ID to join your team&apos;s estimation session</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter room ID"
                    className="flex-1"
                    value={roomIdInput}
                    onChange={(e) => setRoomIdInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
                  />
                  <Button onClick={handleJoinRoom} disabled={!roomIdInput.trim()}>
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:bg-accent/50 transition-colors">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-3">Create New Room</h3>
                <p className="text-muted-foreground mb-4">Start a new planning poker session instantly as the moderator</p>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCreateRoom}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    "Creating..."
                  ) : (
                    <>
                      Create Room
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-muted-foreground">See votes in real-time as team members make their estimates</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multiple Scales</h3>
              <p className="text-muted-foreground">Choose from Fibonacci, T-shirt sizes, or custom estimation scales</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Sign-up Required</h3>
              <p className="text-muted-foreground">Jump straight into estimation sessions without creating accounts</p>
            </div>
          </div>

          {/* How it Works */}
          <div id="how-it-works" className="text-center">
            <h2 className="text-3xl font-bold mb-8">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Create or Join Room</h3>
                  <p className="text-muted-foreground">
                    The first person creates a room and becomes the moderator. Share the room ID with your team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Vote on Stories</h3>
                  <p className="text-muted-foreground">
                    Team members select estimation cards to vote on user story complexity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Reveal & Discuss</h3>
                  <p className="text-muted-foreground">
                    Moderator reveals votes simultaneously to avoid bias and facilitate discussion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Built for agile teams who value collaborative estimation</p>
        </div>
      </footer>
    </div>
  )
}
