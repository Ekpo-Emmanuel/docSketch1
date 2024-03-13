import {v} from "convex/values";
import { query, mutation } from "./_generated/server";

export const getTeam = query ({
    args: {email:v.string()},

    handler: async(ctx: { db: { query: (arg0: string) => { (): any; new(): any; filter: { (arg0: (q: any) => any): { (): any; new(): any; collect: { (): any; new(): any; }; }; new(): any; }; }; }; }, args: { email: any; }) => {
        const result = await ctx.db.
        query('teams')
        .filter((q) => q.eq(q.field('createdBy'), args.email))
        .collect()

        return result
    }
})


export const getTeamByName = query({
    args: { teamName: v.string() },

    handler: async (ctx, args) => {
      const result = await ctx.db.
        query("teams")
        .filter((q) => q.eq(q.field("teamName"), args.teamName))
        .collect();

      return result;
    },
  });



export const createTeam = mutation({
    args: { 
        teamName: v.string(),
        createdBy: v.string()
     },
    handler: async (ctx: { db: { insert: (arg0: string, arg1: any) => any; }; }, args: any) => {
      const result = await ctx.db.insert("teams", args);

      return result
    },
  });