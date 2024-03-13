'use client';

import React, {useEffect} from 'react'
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNav from './_components/SideNav';


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
<div className='grid grid-cols-1 sm:grid-cols-4'>
  <div className='sm:col-span-2 md:col-span-1'>
    <SideNav />
  </div>
  <div className='sm:col-span-3 md:col-span-3'>
    {children}
  </div>
</div>

  )
}
