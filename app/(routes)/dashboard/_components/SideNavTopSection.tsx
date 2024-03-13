import React, { useEffect }  from 'react'
import Image from 'next/image'
import { ChevronDown, Users, Settings, LogOut, Files  } from 'lucide-react';
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





export default function SideNavTopSection({user}: any) {
    const { email, given_name: firstName, family_name: lastName, picture } = user || {};
    const userEmail = String(email);

    const menu = [
        { 
            name: 'Join or Create Team',
            icon: Users,
            link: '/teams/create'
        }, 
        {
            name: 'Settings',
            icon: Settings,
            link: '/'
        },
        {
            name: 'Log out',
            icon: LogOut,
            link: '/'
        }
    ]

    // useEffect(() => {
    //     user && getTeamList()
    // }, [user])
    
    const getTeam = useQuery(api.teams.getTeam, {email: userEmail});
    console.log(getTeam)

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
                        Emmanuel's Team
                    </p>
                        <ChevronDown 
                            strokeWidth={2}
                            size={20}
                            />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className='text-[13px] font-semibold py-[4px]'>
                        Test Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-[13px] font-semibold py-[4px]'>
                        Emmanuel's Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-[13px] font-semibold py-[4px]'>
                        Emmanuel's Team 1
                    </DropdownMenuItem>
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
    </div>
    
    )
}
