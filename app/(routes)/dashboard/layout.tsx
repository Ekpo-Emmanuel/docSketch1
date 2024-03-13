'use client';

import React, {useEffect} from 'react'
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const { user }: any = useKindeBrowserClient();
    // const teamData = useQuery(api.teams.getTeam, { email: user?.email });


    // useEffect(() => {
    //     const checkTeam = async () => {
    //         if (!teamData || !teamData.length) {
    //             router.push('/teams/create');
    //         }
    //     };

    //     if (teamData === undefined) {
    //         // Handle loading state
    //         console.log("Loading team data...");
    //     } else {
    //         user && checkTeam();
    //     }
    // }, [user, teamData, router]);

  return (
    <div>{children}</div>
  )
}
