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
  // <div className='grid grid-cols-12'>
  //     <div className='col-span-3'>
  //       <SideNav />
  //     </div>
  //     <div className='col-span-9'>
  //       {children}
  //     </div>
  //   </div>
  <div className=''>
    <div className=''>
      <SideNav />
    </div>
    <div className='ml-[270px]'>
      {children}
    </div>
  </div>
  )
}
