'use client';

import React, {useEffect} from 'react'
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNav from './_components/_sideNav/SideNav';
import LoadingAnimation from '@/app/_components/LoadingAnimation';


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const { user, isLoading, isAuthenticated, } = useKindeBrowserClient();


    if (isLoading) return <LoadingAnimation />; 

  return isAuthenticated ? (
  <>
    <div className=''>
      <SideNav />
    </div>
    <div className='sm:ml-64'>
      <div className='p-4'>
        {children}
      </div>
    </div>
  </>
  ) : null;
}
