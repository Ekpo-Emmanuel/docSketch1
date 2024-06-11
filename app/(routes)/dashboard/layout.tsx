'use client';

import React, {useState} from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNav from './_components/_sideNav/SideNav';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { FileListContext } from '@/app/_context/FIleListContent';


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const { isLoading, isAuthenticated}: any  = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState<any[]>([]);

    if (isLoading) return <LoadingAnimation />; 

  return isAuthenticated ? (
  <FileListContext.Provider value={{fileList_, setFileList_}}>
    <div className=''>
      <SideNav/>
    </div>
    <div className='sm:ml-60' >
      <div className='px-4 py-4 md:px-4 md:py-4'>
        {children}
      </div>
    </div>
  </FileListContext.Provider>
  ) : null;
}
