import { Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Room, Participant } from "@/lib/room-store"
import { getScaleById } from "@/lib/estimation-scales"

interface StorySectionProps {
  room: Room
  currentParticipant: Participant | undefined
  currentStory: string
  isEditingStory: boolean
  onStoryChange: (story: string) => void
  onStoryUpdate: () => void
  onEditToggle: () => void
}

export function StorySection({
  room,
  currentParticipant,
  currentStory,
  isEditingStory,
  onStoryChange,
  onStoryUpdate,
  onEditToggle
}: StorySectionProps) {
  const currentScaleInfo = getScaleById(room.estimationScale)

  return (
    <div className="text-center mb-8">
      {currentParticipant?.isModerator ? (
        <div className="space-y-4">
          {isEditingStory ? (
            <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
              <Input
                placeholder="Enter story title..."
                value={currentStory}
                onChange={(e) => onStoryChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onStoryUpdate()}
                className="flex-1"
              />
              <Button onClick={onStoryUpdate} size="sm">
                Save
              </Button>
              <Button onClick={onEditToggle} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold">{room.currentStory || "Choose your estimate..."}</h1>
              <Button variant="ghost" size="sm" onClick={onEditToggle} className="h-8 w-8 p-0">
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
  )
}
