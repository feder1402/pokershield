import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CreateRoomCardProps {
  onCreateRoom: () => void
  isCreating: boolean
}

export function CreateRoomCard({
  onCreateRoom,
  isCreating
}: CreateRoomCardProps) {
  return (
    <div className="flex justify-center mb-16">
      <Card className="p-6 hover:bg-accent/50 transition-colors max-w-md w-full">
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
