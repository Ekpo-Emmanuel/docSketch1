import { v } from "convex/values";
import { query, mutation } from "./_generated/server";


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

// export const getTeam = query ({
//   args: {},

//     handler: async (ctx: any, args: any) => {
//       const result = await ctx.db.
//       query('teams')
//       .collect()

//       return result
//   }
// })

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
