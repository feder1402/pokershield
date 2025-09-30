import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createParticipant = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    // Validate that room already exists
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_name", (q) => q.eq("name", args.roomName))
      .first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }

    const participantId = await ctx.db.insert("participants", { roomId: room._id });
    
    // Set participant as moderator if there is no moderator in the room yet
    let isModerator = false;
    if (!room.moderator) {
      await ctx.db.patch(room._id, { moderator: participantId });
      isModerator = true;
    }

    console.log(`Participant created with id ${participantId}, moderator: ${isModerator}`);
    return { participantId, isModerator };
  },
});

export const vote = mutation({
  args: { participantId: v.id("participants"), vote: v.optional(v.string()) },
  handler: async (ctx, args) => {
    ctx.db.patch(args.participantId, { vote: args.vote });
    console.log(`Participant ${args.participantId} vote changed to ${args.vote}`);
  },
});
