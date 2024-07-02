'use client'

import React from 'react'
import { IoMdShare } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { TbDots } from "react-icons/tb";
import { ChevronDown, Users, Settings, LogOut, Files, FolderPlus, ChevronRight } from 'lucide-react';
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

interface MenuItem {
    name: string;
    icon: React.ElementType;
    link: string;
}

interface Props {
    fileName: string;
    onSave: any;
}

export default function WorkSpaceHeader(props: Props) {
    const menu: MenuItem[] = [
        { name: 'Dashboard', icon: Users, link: '/teams/create' },
        { name: 'Export', icon: Settings, link: '/' },
    ];
  return (
    <div className=''>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 '>
                <img src="https://flowbite.com/docs/images/logo.svg" className=" h-5" alt="Flowbite Logo" />
                <h2 className='font-bold'>
                    {props.fileName}
                </h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span className='cursor-pointer hover:bg-slate-300 mt-auto mb-auto' > <TbDots  /> </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='text-[13px] font-semibold py-[4px]'>Helop</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem className='text-[13px] py-[4px]'>Send </DropdownMenuItem>
                                        <DropdownMenuItem className='text-[13px] py-[4px]'>Message</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className='text-[13px] py-[4px]'>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            {menu.map((item, index) => (
                                <Link href={item.link} key={index}>
                                    <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                                        <item.icon size={16} strokeWidth={2} /> {item.name}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                            <LogoutLink>
                                <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                                    <LogOut size={16} strokeWidth={1} />
                                    Logout
                                </DropdownMenuItem>
                            </LogoutLink>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className=''>
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" onClick={() => props.onSave()}>
                <IoSaveSharp />
                <span>Save project</span>
              </button>
                {/* <button className='bg-blue-500 text-sm py-[7px] px-4 flex gap-2 items-center text-white rounded-sm hover:bg-black font-semibold'> <IoMdShare  />Share </button> */}
            </div>
        </div>
    </div>
  )
}
