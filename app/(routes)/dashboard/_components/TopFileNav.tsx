import React from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react';


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
            <div className="inline-flex items-center gap-4 list-none">
                <div className="hidden md:block lg:ml-auto">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="w-full py-[6px] pl-8 pr-4 text-black bg-white border border-gray-200 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-500 sm:text-sm rounded-md placeholder:text-gray-400 placeholder:text-[12px] focus:border-blue-500 text-[12px]"
                            placeholder="Search or CTRL K"
                        />
                    </div>
                </div>
                <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-[14px] text-white bg-blue-500 rounded-sm group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-black active:bg-black active:text-white focus-visible:bg-black">
                    <Send size={14} strokeWidth={2}/>Invite
                </button>

            </div>
        </div>
    </header>
  )
}
