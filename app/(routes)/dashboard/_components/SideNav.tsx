import React, { useState, useRef, useEffect } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavDownSection from './SideNavDownSection';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useConvex } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast  } from "sonner"

export default function SideNav() {
  type NewType = Team;

  const { user }: any = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const sideNavRef = useRef(null);
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<NewType>();
  const convex = useConvex();

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
      toast.message('File Created Successfully', {
        description: 'by ' + user?.email,
      })
    })
    .catch((err:any) => {
      toast.error('Error creating File')
      console.log(err)
    })
  }

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });

    console.log(result);
  }



  return (
    <>
      <button
        onClick={toggleSideNav}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <div className="fixed inset-0 bg-gray-500 opacity-50 z-30 transition-opacity duration-300"
           onClick={() => setIsOpen(false)}
           style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      />
      <div
        ref={sideNavRef}
        className={`fixed top-0 bg-[#F9F9F9] left-0 z-40 p-2 w-64 h-screen flex flex-col transition-transform ${
          isOpen ? '' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <SideNavTopSection 
          user={user} 
          setactiveTeamInfo={(activeTeam: NewType) => setActiveTeam(activeTeam)}
        />
        <SideNavDownSection onFileCreate={onFileCreate} />
      </div>
    </>
  );
}
