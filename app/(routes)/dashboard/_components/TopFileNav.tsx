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
    <header className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <div className="hidden md:block">
                    <nav aria-label="Global">
                    <ul className="flex items-center gap-2 text-sm">
                        {
                            menu.map((link, index) => (
                                <li key={index}>
                                <Link
                                    className="text-gray-600 p-2 rounded-md font-semibold transition hover:text-white hover:bg-black text-[14px]"
                                    href={link.link}
                                >
                                    {link.title}
                                </Link>
                                </li>
                            ))
                        }
                    </ul>
                    </nav>
                </div>
                <div className="inline-flex items-center gap-2 list-none">
                    <div className="hidden mx-10 md:block lg:ml-auto">
                        <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
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
                            className="w-full py-2 pl-10 pr-4 text-black bg-white border border-gray-200 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-500 sm:text-sm rounded-xl placeholder:text-gray-400 placeholder:text-sm focus:border-blue-500 text-sm"
                            placeholder="Search"
                        />
                        </div>
                    </div>
                    <button className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
                    Sign in
                    </button>
                    <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-[14px] text-white bg-blue-500 rounded-sm group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black">
                        <Send size={14} strokeWidth={2}/>Invite
                    </button>
                </div>
            </div>
    </header>
  )
}
