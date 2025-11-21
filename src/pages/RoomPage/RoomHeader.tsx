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
import { Input } from "@/components/ui/input";

import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface RoomHeaderProps {
  numberOfParticipants: number;
  roomName?: string;
  isVotingEnabled: boolean;
  isModerator: boolean;
  storyTitle?: string;
}

export function RoomHeader({
  numberOfParticipants,
  roomName,
  isVotingEnabled,
  isModerator,
  storyTitle,
}: RoomHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState(storyTitle || "");
  const updateStoryTitle = useMutation(api.rooms.updateStoryTitle);

  useEffect(() => {
    setNewStoryTitle(storyTitle || "");
  }, [storyTitle]);

  const onCopyRoomUrl = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveTitle = async () => {
    if (roomName) {
      await updateStoryTitle({ roomName, storyTitle: newStoryTitle });
      setIsEditingTitle(false);
    }
  };

  const handleCancelEdit = () => {
    setNewStoryTitle(storyTitle || "");
    setIsEditingTitle(false);
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4 w-full">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold hidden md:inline">PokerShield</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground hidden sm:inline">Room:</span>
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
            </div>

            {/* Story Title Section */}
            <div className="flex items-center gap-2 ml-4 border-l pl-4 border-border">
              <span className="text-muted-foreground hidden sm:inline">Story:</span>
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    className="h-8 w-64 font-bold"
                    placeholder="Enter story title..."
                    autoFocus
                    onBlur={handleSaveTitle}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveTitle();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                  />
                </div>
              ) : (
                <div 
                  className={`flex items-center gap-2 ${isModerator ? "cursor-pointer hover:opacity-80" : ""}`}
                  onClick={() => isModerator && setIsEditingTitle(true)}
                >
                  <span className="text-lg font-bold text-foreground">
                    {storyTitle || (isModerator ? "Click to add story title" : "")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
             {numberOfParticipants > 1 && (
            <div className="hidden lg:flex items-center justify-center gap-2 mr-4">
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
            <div className="flex items-center gap-2">
              <span className="text-sm">{numberOfParticipants}</span>
              <Users className="h-4 w-4 text-muted-foreground" />
              {isModerator && <Badge variant="secondary" className="hidden sm:inline-flex">Moderator</Badge>}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
