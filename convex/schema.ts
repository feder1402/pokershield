import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    roomName: v.string(),
    isVotingEnabled: v.boolean(),
    numberOfParticipants: v.number(),
    moderator: v.optional(v.id("participants")),
    estimationScale: v.optional(v.string()),
  })
  .index("by_room_name", ["roomName"]),
  participants: defineTable({
    roomId: v.id("rooms"),
    vote: v.optional(v.string()),
    isVotingParticipant: v.boolean(),
  })
  .index("by_room_id", ["roomId"])
});