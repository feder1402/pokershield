import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useSessionStorage } from "@uidotdev/usehooks";

export default function useParticipant(roomName: string | undefined) {

  const createParticipant = useMutation(api.participants.createParticipant);

  const [sessionId, setSessionId] = useSessionStorage<Id<"participants"> | undefined>(`${roomName}-sessionId`,undefined);
  
  console.log("useParticipant: roomName", roomName, "sessioniId", sessionId);
  useEffect(() => {
    if (roomName && !sessionId) { // If there is no sessionId, create a new participant
      console.log("createParticipant", roomName);
      createParticipant({ roomName }).then(({ participantId }) => {
        setSessionId(participantId);
      });
    }
  }, [roomName, sessionId]);

  return sessionId;
}