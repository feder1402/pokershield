import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  participants: defineTable({
    name: v.string(),
    roomId: v.id("rooms"),
  }),
  rooms: defineTable({
    moderator_id: v.string(),
    name: v.string(),
  }),
});