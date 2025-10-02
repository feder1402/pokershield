import { Card, CardContent } from "@/components/ui/card";
import { Room } from "@/lib/room-store";

interface ParticipantsListProps {
  room: Room;
}

export function ParticipantsList({ room }: ParticipantsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-center">Participants</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {room.participants.map((participant) => (
          <Card key={participant.id} className="text-center">
            <CardContent className="p-4">
              {room.votesRevealed && participant.vote ? (
                <span className="text-xl font-bold">{participant.vote}</span>
              ) : (
                <div className="w-12 h-16 bg-primary rounded-md"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
