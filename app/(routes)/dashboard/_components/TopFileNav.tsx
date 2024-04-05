import React from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from 'next/image'


export default function TopFileNav() {
    const menu = [
        {
            title: 'All',
            link: '/all'
        },
        {
            title: 'Recents',
            link: '/all'
        },
        {
            title: 'Created by Me',
            link: '/all'
        },
        {
            title: 'Folders',
            link: '/all'
        },
        {
            title: 'Unsorted',
            link: '/all'
        },
    ]
    const { user } = useKindeBrowserClient();

  return (
    <header>
        <div className="flex items-center justify-between">
            <div className="hidden md:block">
                <nav aria-label="Global">
                <ul className="flex items-center gap-2 text-sm">
                    {
                        menu.map((link, index) => (
                            <li key={index}>
                            <Link
                                className="text-black p-2 rounded-sm transition  hover:bg-gray-200 text-[12px] focus:font-semibold focus:bg-black focus:text-white"
                                href='#'
                            >
                                {link.title}
                            </Link>
                            </li>
                        ))
                    }
                </ul>
                </nav>
            </div>
            <div className="inline-flex items-center gap-2 list-none bg-red-500">
                <div>
                    <img
                        src={user?.picture || ''}
                        width={35}
                        height={35}
                        alt="profile"
                        className="rounded-full"
                    />
                </div>
                <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-[14px] text-white bg-blue-500 rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-black active:bg-black active:text-white focus-visible:bg-black">
                    <Send size={14} strokeWidth={2}/>Invite
                </button>

            </div>
        </div>
    </header>
  )
}
