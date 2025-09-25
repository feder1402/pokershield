"use client"

import { useState, useEffect } from "react"
import { Shield, Users, RotateCcw, Eye, Copy, Check, ArrowLeft, Settings, UserX, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { useParams } from "next/navigation"
import { useRoomStore } from "@/lib/room-store"
import { ESTIMATION_SCALES, getScaleValues, getScaleById } from "@/lib/estimation-scales"
import Link from "next/link"

export default function RoomPage() {
  const params = useParams()
  const roomId = params.roomId as string

  const [copied, setCopied] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [currentStory, setCurrentStory] = useState("")
  const [isEditingStory, setIsEditingStory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const {
    getRoom,
    getCurrentParticipant,
    joinRoom,
    castVote,
    revealVotes,
    resetVotes,
    setEstimationScale,
    setCurrentStory: updateCurrentStory,
    leaveRoom,
  } = useRoomStore()

  const room = getRoom(roomId)
  const currentParticipant = getCurrentParticipant(roomId)

  useEffect(() => {
    setIsClient(true)
    if (room && currentParticipant) {
      setHasJoined(true)
      setCurrentStory(room.currentStory || "")
    }
  }, [room, currentParticipant])

  const handleJoinRoom = () => {
    joinRoom(roomId)
    setHasJoined(true)
  }

  const handleVote = (vote: string) => {
    if (!currentParticipant || room?.votesRevealed) return
    castVote(roomId, currentParticipant.id, vote)
  }

  const handleReveal = () => {
    if (!currentParticipant?.isModerator) return
    revealVotes(roomId)
  }

  const handleReset = () => {
    if (!currentParticipant?.isModerator) return
    resetVotes(roomId)
  }

  const handleScaleChange = (scale: string) => {
    // Updated parameter type
    if (!currentParticipant?.isModerator) return
    setEstimationScale(roomId, scale)
  }

  const handleStoryUpdate = () => {
    if (!currentParticipant?.isModerator) return
    updateCurrentStory(roomId, currentStory)
    setIsEditingStory(false)
  }

  const handleRemoveParticipant = (participantId: string) => {
    if (!currentParticipant?.isModerator || participantId === currentParticipant.id) return
    leaveRoom(roomId, participantId)
  }

  const copyRoomUrl = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getVoteCounts = () => {
    if (!room) return {}
    return room.participants
      .filter((p) => p.hasVoted && p.vote)
      .reduce(
        (acc, p) => {
          const vote = p.vote!
          acc[vote] = (acc[vote] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background grid-bg flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Room Not Found</h1>
            <p className="text-muted-foreground mb-4">Room {roomId} doesn&apos;t exist or has been closed.</p>
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isClient || !hasJoined) {
    return (
      <div className="min-h-screen bg-background grid-bg flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Join Room</h1>
              <p className="text-muted-foreground">
                Join room <code className="bg-muted px-1 rounded">{roomId}</code>
              </p>
            </div>

            <Button onClick={handleJoinRoom} className="w-full">
              Join Room
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentScale = getScaleValues(room.estimationScale)
  const currentScaleInfo = getScaleById(room.estimationScale)
  const allVoted = room.participants.every((p) => p.hasVoted)

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">PokerShield</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Room:</span>
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{roomId}</code>
                <Button variant="ghost" size="sm" onClick={copyRoomUrl} className="h-8 w-8 p-0">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{room.participants.length} participants</span>
              </div>
              <ThemeToggle />
              {currentParticipant?.isModerator && (
                <>
                  <Badge variant="secondary">Moderator</Badge>
                  <Dialog open={showSettings} onOpenChange={setShowSettings}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Room Settings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-3">Estimation Scale</h4>
                          <Select value={room.estimationScale} onValueChange={handleScaleChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ESTIMATION_SCALES.map((scale) => (
                                <SelectItem key={scale.id} value={scale.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{scale.name}</span>
                                    <span className="text-xs text-muted-foreground">{scale.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {currentScaleInfo && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Values: {currentScaleInfo.values.join(", ")}
                            </p>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-3">Participants</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {room.participants.map((participant) => (
                              <div
                                key={participant.id}
                                className="flex items-center justify-between p-2 bg-muted rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {participant.id === currentParticipant?.id ? "You" : `Participant ${participant.id.slice(-4)}`}
                                  </span>
                                  {participant.isModerator && (
                                    <Badge variant="outline" className="text-xs">
                                      Mod
                                    </Badge>
                                  )}
                                </div>
                                {!participant.isModerator && participant.id !== currentParticipant?.id && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveParticipant(participant.id)}
                                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  >
                                    <UserX className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Story Title */}
          <div className="text-center mb-8">
            {currentParticipant?.isModerator ? (
              <div className="space-y-4">
                {isEditingStory ? (
                  <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
                    <Input
                      placeholder="Enter story title..."
                      value={currentStory}
                      onChange={(e) => setCurrentStory(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleStoryUpdate()}
                      className="flex-1"
                    />
                    <Button onClick={handleStoryUpdate} size="sm">
                      Save
                    </Button>
                    <Button onClick={() => setIsEditingStory(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold">{room.currentStory || "Choose your estimate..."}</h1>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingStory(true)} className="h-8 w-8 p-0">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {currentScaleInfo && (
                  <p className="text-sm text-muted-foreground">Using {currentScaleInfo.name} scale</p>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-2">{room.currentStory || "Choose your estimate..."}</h1>
                {currentScaleInfo && (
                  <p className="text-sm text-muted-foreground">Using {currentScaleInfo.name} scale</p>
                )}
              </div>
            )}
          </div>

          {/* Voting Cards */}
          <div className="mb-8">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 max-w-4xl mx-auto">
              {currentScale.map((value) => (
                <button
                  key={value}
                  onClick={() => handleVote(value)}
                  disabled={room.votesRevealed}
                  className={`poker-card h-20 text-lg font-bold ${
                    currentParticipant?.vote === value ? "selected" : ""
                  } ${room.votesRevealed ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-center">Participants</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {room.participants.map((participant) => (
                <Card key={participant.id} className="text-center">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <span className="font-semibold text-sm">P</span>
                      </div>
                      <span className="text-sm font-medium">
                        {participant.id === currentParticipant?.id ? "You" : `Participant ${participant.id.slice(-4)}`}
                      </span>
                      {participant.isModerator && (
                        <Badge variant="outline" className="text-xs">
                          Mod
                        </Badge>
                      )}
                      <div className="w-16 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                        {participant.hasVoted ? (
                          room.votesRevealed && participant.vote ? (
                            <span className="text-lg font-bold">{participant.vote}</span>
                          ) : (
                            <div className="w-12 h-16 bg-primary rounded-md"></div>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">No vote</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Voting Status */}
          <div className="text-center mb-8">
            {currentParticipant?.hasVoted ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>
                  You voted: <strong>{currentParticipant.vote}</strong>
                </span>
              </div>
            ) : (
              <p className="text-muted-foreground">You haven&apos;t voted yet</p>
            )}
          </div>

          {/* Moderator Controls */}
          {currentParticipant?.isModerator && (
            <div className="flex justify-center gap-4">
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Reset Votes
              </Button>
              <Button onClick={handleReveal} disabled={!allVoted} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Reveal Votes
              </Button>
            </div>
          )}

          {/* Voting Summary */}
          {room.votesRevealed && (
            <div className="mt-8 text-center">
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Voting Results</h3>
                  <div className="space-y-2">
                    {Object.entries(getVoteCounts()).map(([vote, count]) => (
                      <div key={vote} className="flex justify-between items-center">
                        <span className="font-medium">{vote}</span>
                        <Badge variant="secondary">
                          {count} vote{count !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
