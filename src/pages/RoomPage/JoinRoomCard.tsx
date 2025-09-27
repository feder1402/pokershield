import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface JoinRoomCardProps {
  roomId: string
  onJoinRoom: () => void
}

export function JoinRoomCard({ roomId, onJoinRoom }: JoinRoomCardProps) {
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

          <Button onClick={onJoinRoom} className="w-full">
            Join Room
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
