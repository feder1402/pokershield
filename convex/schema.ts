import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    voting: v.boolean(),
    moderator: v.optional(v.id("participants")),
  })
  .index("by_name", ["name"]),
  participants: defineTable({
    roomId: v.id("rooms"),
    vote: v.optional(v.string()),
  })
  .index("by_roomId", ["roomId"]),
});