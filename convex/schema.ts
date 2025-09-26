import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  participants: defineTable({
    name: v.string(),
    roomId: v.optional(v.id("rooms")),
  }),
  rooms: defineTable({
    moderator_id: v.optional(v.string()),
    name: v.optional(v.string()),
  }),
});