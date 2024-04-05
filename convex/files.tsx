import {v} from "convex/values";
import { query, mutation } from "./_generated/server";


export const createFile = mutation({
    args: { 
        name: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archieve: v.boolean(),
        document: v.string(),
        whiteboard: v.string()
     },
    handler: async (ctx: { db: { insert: (arg0: string, arg1: any) => any; }; }, args: any) => {
      const result = await ctx.db.insert("files", args);

      return result;
    }
})


export const getFiles = query({
    args: {},
    handler: async (ctx: { db: { query: (arg0: string) => any; }; }, args: any) => {
        const result = await ctx.db.
          query("files")
          .collect();

        return result;
    }
})

export const getFilesByTeamId = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx: { db: { query: (arg0: string) => any; }; }, args: any) => {
      const result = await ctx.db.
        query("files")
        .filter((q: any) => q.eq(q.field("teamId"), args.teamId))
        .collect();

      return result;
  }
})