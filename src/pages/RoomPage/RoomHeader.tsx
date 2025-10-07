import {
  Shield,
  Users,
  Copy,
  Check,
  PartyPopper,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { useState } from "react";

interface RoomHeaderProps {
  numberOfParticipants: number;
  roomName?: string;
  isVotingEnabled: boolean;
  isModerator: boolean;
}

export function RoomHeader({
  numberOfParticipants,
  roomName,
  isVotingEnabled,
  isModerator,
}: RoomHeaderProps) {
  const [copied, setCopied] = useState(false);

  const onCopyRoomUrl = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <header className="border-b border-border">
      <div className="container  mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4 w-full">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PokerShield</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Room:</span>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                {roomName}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopyRoomUrl}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              {isModerator && numberOfParticipants === 1 && (
                <span className="text-md font-bold flex items-center justify-center gap-2 text-blue-500 animate-wiggle">
                  <ArrowLeft className="h-4 w-4 text-foreground" /> Invite
                  participants to start voting
                </span>
              )}
            </div>
          </div>

          {numberOfParticipants > 1 && (
            <div className="flex items-center justify-center w-full gap-2">
              {isVotingEnabled ? (
                <span className="text-md text-foreground font-bold">
                  Start Voting!
                </span>
              ) : (
                <>
                  <PartyPopper
                    className="h-4 w-4 text-muted-foreground"
                    size={20}
                  />
                  <span className="text-md text-muted-foreground font-bold">
                    Voting Results
                  </span>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm">{numberOfParticipants}</span>
              <Users className="h-4 w-4 text-muted-foreground" />
              {isModerator && <Badge variant="secondary">Moderator</Badge>}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
