import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Room, Participant } from "@/lib/room-store"

interface ParticipantsListProps {
  room: Room
  currentParticipant: Participant | undefined
}

export function ParticipantsList({ room, currentParticipant }: ParticipantsListProps) {
  return (
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
  )
}
