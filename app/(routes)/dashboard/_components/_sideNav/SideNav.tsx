'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavDownSection from './SideNavDownSection';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast  } from "sonner"
import { Menu } from 'lucide-react';
import { FileListContext } from '@/app/_context/FIleListContent';
import { useRouter } from '@/node_modules/next/navigation';
  


interface Team {
  _id: any;
}

interface Props {
  
}

export default function SideNav(props: Props) {

  const { user }: any = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<Team>();
  const teamId = activeTeam?._id;
  const [IsLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const convex = useConvex();
  const { fileList_, setFileList_ }: any = useContext(FileListContext);
  const router = useRouter();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);

  useEffect(() => {
    activeTeam && setActiveTeam(activeTeam);
}, [activeTeam])


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeTeam, teamId]);

  const checkSubscription = async () => {
    // const subscriptionStatus = await convex.query(api.subscriptions.getUserSubscriptionStatus, { email: user?.email });
    // setIsSubscribed(subscriptionStatus === 'subscribed');

  };

  const onCreateFile = (fileName: string) => {
    if (!activeTeam) {
      console.error("Active team is not set.");
      return;
    }
    createFile({
      name: fileName,
      teamId: activeTeam._id,
      createdBy: user?.email,
      archieve: false,
      document: '',
      whiteboard: ''
    })
    .then((res: any) => {
      getFiles();
      toast.success('File Created Successfully', {
        description: 'by ' + user?.email,
      });
      // router.push(`/workspace/${res}`);
    })
    .catch((err: any) => {
      toast.error('Error creating File');
      console.log(err);
    });
  };

  const getFiles = async () => {
    const newFiles = await convex.query(api.files.getFilesByTeamId, { teamId: teamId });
    setFileList_(newFiles);
  };


  return (
    <>
      <button
        onClick={toggleSideNav}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <Menu />
      </button>
      <div className="fixed inset-0 bg-gray-500 opacity-50 z-30 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      />
      <div
        ref={sideNavRef}
        className={`
          fixed top-0 bg-[#F9F9F9] left-0 z-40 p-2 py-4 w-60 h-screen flex flex-col transition-transform 
          ${isOpen ? '' : '-translate-x-full sm:translate-x-0'}
        `}
      >
        <SideNavTopSection 
          user={user} 
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
        <SideNavDownSection 
          onCreateFile={onCreateFile} 
          totalFiles={fileList_?.length}
          isSubscribed={isSubscribed}
        />
      </div>
    </>
  );
}


