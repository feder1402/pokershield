import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface ActionCardsProps {
  roomIdInput: string
  setRoomIdInput: (value: string) => void
  onJoinRoom: () => void
  onCreateRoom: () => void
  isCreating: boolean
}

export function ActionCards({
  roomIdInput,
  setRoomIdInput,
  onJoinRoom,
  onCreateRoom,
  isCreating
}: ActionCardsProps) {
  return (
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
              onKeyDown={(e) => e.key === "Enter" && onJoinRoom()}
            />
            <Button onClick={onJoinRoom} disabled={!roomIdInput.trim()}>
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
            onClick={onCreateRoom}
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
  )
}
