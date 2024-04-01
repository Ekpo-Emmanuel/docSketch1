'use client';

import React, { useState, useRef, useEffect } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavDownSection from './SideNavDownSection';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast  } from "sonner"
import { Menu } from 'lucide-react';




export default function SideNav() {
  type NewType = Team;

  const { user }: any = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const sideNavRef = useRef(null);
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<NewType>();
  const [IsLoadingFiles, setIsLoadingFiles] = useState(false);
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam])

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onFileCreate = (fileName: string) => {
    createFile({
        name: fileName,
        teamId: activeTeam?._id,
        createdBy: user?.email,
        archieve: false,
        document: '',
        whiteboard: ''
    })
    .then((res: any) => {
      getFiles();
      toast.message('File Created Successfully', {
        description: 'by ' + user?.email,
      })
    })
    .catch((err:any) => {
      toast.error('Error creating File')
      console.log(err)
    })
  }

  const tasks = useQuery(api.files.getFiles);
  const getFiles = async () => {
    // try {
    //   // setIsLoadingFiles(true);
    //   const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
    //   console.log(result);
    // } catch (error) {
    //   console.error('Error fetching files:', error);
    // } finally {
    //   setIsLoadingFiles(false);
    // }

    // const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
    // console.log(tasks); 
    setTotalFiles(tasks?.length);
  }



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
      ></div>
      <div
        ref={sideNavRef}
        className={`fixed top-0 bg-[#F9F9F9] left-0 z-40 p-2 py-4 w-60 h-screen flex flex-col transition-transform ${
          isOpen ? '' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <SideNavTopSection 
          user={user} 
          setactiveTeamInfo={(activeTeam: NewType) => setActiveTeam(activeTeam)}
        />
        <SideNavDownSection 
          onFileCreate={onFileCreate} 
          totalFiles={tasks?.length}
        />
      </div>
    </>
  );
}


