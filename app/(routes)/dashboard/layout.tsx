'use client';

import React, {useEffect, useState} from 'react'
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNav from './_components/_sideNav/SideNav';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { FileListContext } from '@/app/_context/FIleListContent';


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const { user, isLoading, isAuthenticated, } = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState<any[]>([]);


    if (isLoading) return <LoadingAnimation />; 

  return isAuthenticated ? (
  <>
  <FileListContext.Provider value={{fileList_, setFileList_}}>
    <div className=''>
      <SideNav />
    </div>
    <div className='sm:ml-60' >
      <div className='p-3'>
        {children}
      </div>
    </div>
  </FileListContext.Provider>
  </>
  ) : null;
}
