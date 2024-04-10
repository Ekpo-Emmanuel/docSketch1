'use client';

import { FiPlus } from "react-icons/fi";
import Link from "@/node_modules/next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";
import {useQuery} from 'convex/react'
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
DialogClose,
} from "@/components/ui/dialog"
import React, { useState, useEffect } from "react";


export default function TeamContainer() {
  const { user, isLoading }: any = useKindeBrowserClient();
  const teams = useQuery(api.teams.getTeam);
  const [teamsData, setTeamsData] = useState([]);
  
  useEffect(() => {
    if (user && teams) {
      setTeamsData(teams);
    }
  }, [user, teams]);

  function formatDate(timestamp: string) {
    const milliseconds = parseFloat(timestamp);  
    const date = new Date(milliseconds);
  
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    return formattedDate;
  }

  function firstLetter(teamName: string) {
    return teamName.split('')[0].toUpperCase();
  }
  
  const delTeam = api.teams.deleteTeam;
  function deleteTeam(id: string) {
    // api.teams.deleteTeam(id);
    // console.log(id)
    console.log('deleted')
  }

  return (
    <div className="mt-4">
        <Link href={'/teams/create'} className="flex items-center gap-2 flex-wrap bg-blue-500 text-white px-4 py-1 w-fit rounded-sm text-sm hover:bg-blue-600">
            <FiPlus strokeWidth={3} /> Create New Team 
        </Link>
        {isLoading && <LoadingAnimation />}
        <div className="mt-8 lg:flex lg:gap-4 cursor-pointer sm:flex-col">
          {teamsData.sort((a, b) => b._creationTime - a._creationTime).map((team, index)  => (
              <div key={team._id} className="w-full p-2 flex items-center border-b-2 border-gray-200 hover:bg-gray-100">
                  <div className="w-full flex items-center gap-4">
                      <div className="bg-black w-10 h-10 rounded-md flex items-center justify-center text-white"> {firstLetter(team.teamName)} </div>
                      <div className="details flex flex-col gap-1">
                          <p className="text-[16px] font-semibold">{team.teamName}</p>
                          <span className="text-[12px]">{formatDate(team._creationTime)}</span>
                      </div>
                  </div>
                  <div className="relative inline-block text-left">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                          <div className="flex items-center p-1 rounded-md hover:bg-gray-200 cursor-pointer">
                              <RxDotsHorizontal />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem className='text-[13px] py-[4px] font-semibold cursor-pointer'>Rename</DropdownMenuItem>
                            <DropdownMenuItem className='text-[13px] py-[4px] font-semibold cursor-pointer'>Members</DropdownMenuItem>
                                <DropdownMenuItem className='text-[13px] py-[4px] font-semibold text-red-500 cursor-pointer'>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              </div>
          ))}
        </div>
    </div>
  )
}
