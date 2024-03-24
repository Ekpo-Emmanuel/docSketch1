import {v} from "convex/values";
import { query, mutation } from "./_generated/server";


export const createFile = mutation({
    args: { 
        name: v.string(),
        teamId: v.string(),
        createdBy: v.string()
     },
    handler: async (ctx: { db: { insert: (arg0: string, arg1: any) => any; }; }, args: any) => {
      const result = await ctx.db.insert("files", args);

      return result;
    }
})