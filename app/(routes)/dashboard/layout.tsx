"use client";

import React, { useState, useEffect, useMemo } from "react";
import SideNav from "./_components/_sideNav/SideNav";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import { FileListContext } from "@/app/_context/FIleListContent";
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';




export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const convex = useConvex();
  const { user, isLoading, isAuthenticated }: any = useKindeBrowserClient();
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const router = useRouter();

  const filterNonArchivedFiles = (files: any[]) => {
    return files.filter((file: any) => !file.archive);
  };
  
  const nonArchivedFiles = useMemo(() => filterNonArchivedFiles(allFiles), [allFiles]);

  useEffect(() => {
    if (user) {
      checkTeam();
      checkSubscription();
      fetchFiles();
    }
  }, [user]);


  const checkTeam = async() => {
    const result = await convex.query(api.teams.getTeam, { email : user?.email });
    if(!result?.length)
    {
      router.push('teams/create')
    }
  }

  const fetchFiles = async () => {
    if (user) {
      try {
        const files = await convex.query(api.files.getFiles);
        setAllFiles(files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }
  };

  const checkSubscription = async () => {
    // Fetch subscription status for the user
    // Assume you have a function to check subscription status
    // const subscriptionStatus = await convex.query(api.subscriptions.getUserSubscriptionStatus, { email: user?.email });
    // setIsSubscribed(subscriptionStatus === 'subscribed');
    console.log("isSubscribed", isSubscribed)
  }

  isLoading && <LoadingAnimation />

  return isAuthenticated ? (
    <FileListContext.Provider value={{ 
      allFiles, 
      setAllFiles, 
      nonArchivedFiles, 
      isSubscribed 
    }}>
      <SideNav />
      <div className="sm:ml-60">
        <div className="px-4 py-4 md:px-4 md:py-4">
          {children}
        </div>
      </div>
    </FileListContext.Provider>
  ) : null;
}
