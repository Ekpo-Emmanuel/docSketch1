'use client';

import React, {useEffect} from 'react'
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function DashboardLayout(
    { children, } : 
    Readonly<{
        children: React.ReactNode;
    }>
    ) {
    const { user } = useKindeBrowserClient();

    // useEffect(() => {
        
    // }, [])

    const checkTeam = async () => {
        const result = await useQuery(api.teams.getTeam, { email: user?.email });

    }
  return (
    <div>{children}</div>
  )
}
