import {v} from "convex/values";
import { query, mutation } from "./_generated/server";

export const getTeam: any => ({
    args: {email:v.string()},

    handler: async(ctx: { db: { query: (arg0: string) => any[]; }; }, args: { email: any; }) => {
        const result = await ctx.db.query('teams')
        .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field('createdBy'), args.email))
    }
})