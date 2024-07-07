import { v } from "convex/values";
import { query, mutation } from "./_generated/server";




export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.insert("teams", args);

    return result;
  },
});

export const getTeam = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();

    return result;
  },
});

export const getTeamByName = query({
  args: { teamName: v.optional(v.string()) },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db
      .query("teams")
      .filter((q: any) => q.eq(q.field("teamName"), args.teamName))
      .collect();

    return result;
  },
});

export const addUserToTeam = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const team = await ctx.db
        .query("teams")
        .filter((q: any) => q.eq(q.field("teamId"), args.teamId))
        .collect();

      const user = await ctx.db
        .query("users")
        .filter((q: any) => q.eq(q.field("email"), args.email))
        .collect();

      await ctx.db
        .query("users")
        .filter((q: any) => q.eq(q.field("userId"), user[0]._id))
        .update((q: any) => q.set("teamId", team[0]._id));
    } catch (error) {
      console.log(error);
    }
  }
})

export const deleteTeam = mutation({
  args: {
    id: v.id("teams"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      await ctx.db.delete(args.id);
    } catch (error) {
      console.log(error);
    }
  },
});
