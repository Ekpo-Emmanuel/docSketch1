"use client";

import React, { useState, useEffect, useMemo, ReactNode } from "react";
import SideNav from "./_components/_sideNav/SideNav";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import { FileListContext } from "@/app/_context/FIleListContent";
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const convex = useConvex();
  const { user, isLoading, isAuthenticated }: any = useKindeBrowserClient();
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const router = useRouter();

  const nonArchivedFiles = useMemo(() => allFiles.filter(file => !file.archive), [allFiles]);
  const nonTrashedFiles = useMemo(() => allFiles.filter(file => !file.trash), [allFiles]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          await checkTeam();
          await checkSubscription();
          await fetchFiles();
        } catch (error) {
          console.error('Error in fetchData:', error);
        }
      };
      fetchData();
    }
  }, [user]);

  const checkTeam = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, { email: user?.email });
      if (!result?.length) {
        router.push('teams/create');
      }
    } catch (error) {
      console.error('Error checking team:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const files = await convex.query(api.files.getFiles);
      setAllFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const checkSubscription = async () => {
    try {
      // Your logic for checking subscription
      console.log("isSubscribed", isSubscribed);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  if (isLoading) return <LoadingAnimation />;

  return isAuthenticated ? (
    <FileListContext.Provider value={{ 
      allFiles, 
      setAllFiles, 
      nonArchivedFiles,
      nonTrashedFiles,
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
