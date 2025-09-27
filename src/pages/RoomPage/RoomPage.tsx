import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRoomStore } from "@/lib/room-store"
import { RoomHeader } from "./RoomHeader"
import { StorySection } from "./StorySection"
import { VotingCards } from "./VotingCards"
import { ParticipantsList } from "./ParticipantsList"
import { ModeratorControls } from "./ModeratorControls"
import { VotingResults } from "./VotingResults"
import { JoinRoomCard } from "./JoinRoomCard"
import { RoomNotFoundCard } from "./RoomNotFoundCard"

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

  const handleStoryChange = (story: string) => {
    setCurrentStory(story)
  }

  const handleEditToggle = () => {
    setIsEditingStory(!isEditingStory)
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


  if (!room) {
    return <RoomNotFoundCard roomId={roomId} />
  }

  if (!isClient || !hasJoined) {
    return <JoinRoomCard roomId={roomId} onJoinRoom={handleJoinRoom} />
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <RoomHeader
        room={room}
        roomId={roomId}
        currentParticipant={currentParticipant}
        copied={copied}
        showSettings={showSettings}
        onCopyRoomUrl={copyRoomUrl}
        onScaleChange={handleScaleChange}
        onRemoveParticipant={handleRemoveParticipant}
        setShowSettings={setShowSettings}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <StorySection
            room={room}
            currentParticipant={currentParticipant}
            currentStory={currentStory}
            isEditingStory={isEditingStory}
            onStoryChange={handleStoryChange}
            onStoryUpdate={handleStoryUpdate}
            onEditToggle={handleEditToggle}
          />

          <VotingCards
            room={room}
            currentParticipant={currentParticipant}
            onVote={handleVote}
          />

          <ParticipantsList
            room={room}
            currentParticipant={currentParticipant}
          />

          <ModeratorControls
            room={room}
            currentParticipant={currentParticipant}
            onReset={handleReset}
            onReveal={handleReveal}
          />

          <VotingResults room={room} />
        </div>
      </main>
    </div>
  )
}
