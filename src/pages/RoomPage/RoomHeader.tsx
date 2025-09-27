import { Shield, Users, Copy, Check, Settings, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { Room, Participant } from "@/lib/room-store"
import { ESTIMATION_SCALES, getScaleById } from "@/lib/estimation-scales"

interface RoomHeaderProps {
  room: Room
  roomId: string
  currentParticipant: Participant | undefined
  copied: boolean
  showSettings: boolean
  onCopyRoomUrl: () => void
  onScaleChange: (scale: string) => void
  onRemoveParticipant: (participantId: string) => void
  setShowSettings: (show: boolean) => void
}

export function RoomHeader({
  room,
  roomId,
  currentParticipant,
  copied,
  showSettings,
  onCopyRoomUrl,
  onScaleChange,
  onRemoveParticipant,
  setShowSettings
}: RoomHeaderProps) {
  const currentScaleInfo = getScaleById(room.estimationScale)

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PokerShield</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Room:</span>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{roomId}</code>
              <Button variant="ghost" size="sm" onClick={onCopyRoomUrl} className="h-8 w-8 p-0">
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
                        <Select value={room.estimationScale} onValueChange={onScaleChange}>
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
                                  onClick={() => onRemoveParticipant(participant.id)}
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
  )
}
