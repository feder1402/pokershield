import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";
import { useSessionStorage } from "@uidotdev/usehooks";

export default function useParticipant(roomName: string | undefined) {

  const createParticipant = useMutation(api.participants.createParticipant);

  const [participantId, setParticipantId] = useSessionStorage<Id<"participants"> | undefined>(`${roomName}-participantId`,undefined)
  const participant = useQuery(api.participants.getParticipant, { participantId });
  
  console.log("useParticipant: roomName", roomName, "participantId", participantId);
  useEffect(() => {
    if (roomName && !participantId) { // If there is no sessionId, create a new participant
      console.log("createParticipant", roomName);
      createParticipant({ roomName }).then((participant) => {
        participant && setParticipantId(participant.participantId);
      });

    }
  }, [roomName, participantId]);

  return participant;
}