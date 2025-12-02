import {
  Shield,
  Users,
  Copy,
  Check,
  PartyPopper,
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
    <header className="min-w-full bg-foreground border-b border-border/20">
      <div className="mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Shield className="h-6 w-6 text-primary-foreground" />
              <span className="text-xl font-bold hidden md:inline text-background">PokerShield</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-background/70 hidden sm:inline">Room:</span>
              <code className="bg-background/20 px-2 py-1 rounded text-sm font-mono text-background">
                {roomName}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopyRoomUrl}
                className="h-8 w-8 p-0 text-background hover:bg-background/20"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Story Title Section */}
            <div className="flex items-center gap-2 ml-4 border-l pl-4 border-background/20">
              <span className="text-background/70 hidden sm:inline">Story:</span>
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    className="h-8 w-64 font-bold bg-background text-foreground"
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
                  <span className="text-lg font-bold text-background">
                    {storyTitle || (isModerator ? "Click to add story title" : "")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-background">{numberOfParticipants}</span>
              <Users className="h-4 w-4 text-background/70" />
              {isModerator && <Badge variant="secondary" className="hidden sm:inline-flex bg-background/20 text-background">Moderator</Badge>}
            </div>
            <ThemeToggle className="text-background hover:bg-background/20" />
          </div>
        </div>
      </div>
    </header>
  );
}
