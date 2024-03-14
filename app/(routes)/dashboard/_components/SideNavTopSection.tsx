import React, { useEffect, useState }  from 'react'
import Image from 'next/image'
import { ChevronDown, Users, Settings, LogOut, Files, FolderPlus  } from 'lucide-react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';




interface User {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  }
  
  interface Team {
    createdBy: string;
    teamName: string;
    _id: string;
  }
  
  interface MenuItem {
    name: string;
    icon: React.ElementType;
    link: string;
  }
  
  interface Props {
    user: User;
  }
  


export default function SideNavTopSection({user}: any) {
    const { email, given_name: firstName, family_name: lastName, picture } = user || {};
    const userEmail = email ? String(email) : '';
    const [teamList, setTeamList] = useState<Team[]>([]);
    const [currentTeam, setCurrentTeam] = useState<string>('');
    const router = useRouter();

    
    // const getTeam = useQuery(api.teams.getTeam, {email: userEmail});
    const teamData = useQuery(api.teams.getTeam, { email: userEmail });
    useEffect(() => {
        if (teamData) {
          setTeamList(teamData);
          setCurrentTeam(teamData[0]?.teamName);
        }
      }, [teamData]);

    const menu: MenuItem[] = [
        { name: 'Join or Create Team', icon: Users, link: '/teams/create' },
        { name: 'Settings', icon: Settings, link: '/' },
    ];

    const handleCurrentTeamChange = (teamName: string) => {
        setCurrentTeam(teamName);
    }

    const capitalizeWords = (str: string | undefined) => {
        return str && str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    
    const cutWordLength = (str: string | undefined, limit: number) => {
        if (str && str.length > limit) {
            return str.slice(0, limit) + '...';
        }
        return str
    }
    return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-between cursor-pointer p-2 rounded-sm hover:bg-slate-100 focus:bg-slate-100'>
                    <p className='text-md font-semibold flex items-center gap-2'>
                        <Image 
                            src='https://flowbite.com/docs/images/logo.svg' 
                            width={20}
                            height={20}
                            alt='logo'
                        />
                            {capitalizeWords(cutWordLength(currentTeam, 10))}
                    </p>
                        <ChevronDown 
                            strokeWidth={2}
                            size={20}
                            />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    {teamList.map((team: Team) => (
                        <DropdownMenuItem  
                            key={team._id} 
                            className={`text-[13px] font-semibold py-[4px] ${currentTeam === team.teamName ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => handleCurrentTeamChange(team.teamName)}
                        >
                            {capitalizeWords(team.teamName)}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='text-[13px] font-semibold py-[4px]'>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem className='text-[13px] py-[4px]'>Email</DropdownMenuItem>
                            <DropdownMenuItem className='text-[13px] py-[4px]'>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-[13px] py-[4px]'>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {menu.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                                <item.icon size={16} strokeWidth={1}/> {item.name}
                            </DropdownMenuItem>
                        </Link>
                    ))}
                    <LogoutLink>
                        <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                            <LogOut size={16} strokeWidth={1}/>
                            Logout
                        </DropdownMenuItem>
                    </LogoutLink>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                <DropdownMenuItem>
                    <div className='flex items-center gap-2'>
                        <img src={picture} alt={firstName} width={30} height={30} className='rounded-full' />
                        <div className='flex flex-col line-h--10'>
                            <p className='text-[14px] font-semibold'>{firstName} {lastName}</p>
                            <p className='text-[11px] '>{userEmail}</p>
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> 

        <div className='flex items-center justify-between cursor-pointer py-2 px-4 mt-8 rounded-sm hover:bg-slate-100 '>
            <p className='flex gap-2 align-center items-center text-[14px] font-semibold'>
                <Files size={16} />All Files
            </p>
            <p className='text-[11px]'>A</p>
        </div>
        <div className='flex items-center justify-between py-2 px-4 mt-4 '>
            <p className='flex gap-2 align-center items-center text-[11px] uppercase'>
                Team Folders
            </p>
            <p className='text-[11px]'>
                <FolderPlus size={14} strokeWidth={1} />
            </p>
        </div>
        {/* folders */}
        <div className='flex flex-col items-center justify-between cursor-pointer py-1rounded-sm '>
             <div className='text-[13px] pl-8 w-full font-semibold rounded-sm py-2 text-black hover:bg-slate-200'> Untitled Folder</div>                     
             <div className='text-[13px] pl-8 w-full font-semibold rounded-sm py-2 text-black hover:bg-slate-200'> Untitled Folder</div>                     
             <div className='text-[13px] pl-8 w-full font-semibold rounded-sm py-2 text-black hover:bg-slate-200'> Untitled Folder</div>                     
        </div>
    </div>
    
    )
}
