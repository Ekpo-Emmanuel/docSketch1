import {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Flag, Layers, Archive, Lock } from 'lucide-react';


interface MenuItem {
  name: string
  icon: React.ElementType
  letter: string,
  link: string
}

export default function SideNavDownSection() {

  const menu: MenuItem[] = [
    { name: 'Teams', icon: Layers, letter: 'T', link: '#' },
    { name: 'Private Files', icon: Lock, letter: 'S', link: '#' },
    { name: 'Plans', icon: Flag, letter: 'P', link: '#' },
    { name: 'Archive', icon: Archive, letter: 'E', link: '#' },
  ]
  
  return (
    <div className="mt-auto flex flex-col gap-4">
        <div>
         {menu.map((item, index) => (
            <Link 
              href='#' 
              key={index} 
              className="flex items-end justify-between px-4 py-2 rounded-sm w-full hover:bg-gray-100 focus:bg-black focus:text-white"
            >
                <div className='flex items-center gap-3'>
                  <item.icon size={14} strokeWidth={1} />
                  <span className='text-[13px] font-semibold'>{item.name}</span>
                </div>
                <span className='text-[11px] opacity-70'>{item.letter}</span>
            </Link>
         ))}
        </div>
        <div>
          <button className="flex items-end justify-between bg-blue-500 px-4 py-3 rounded-sm w-full transition ease-in-out duration-300 hover:bg-blue-600">
            <span className='text-white text-[13px] font-semibold'>New File</span>
            <span className='text-white text-[11px] opacity-70'>CTRL N</span>
          </button>
        </div>
        <div>
          {/* Range */}
          <p className='text-[13px]'>
            <span className='font-bold'>1</span> out of <span className='font-bold'>5</span> files used.
          </p>
          <p className='text-[13px]'>
            <Link href='/plans' className='underline'>Upgrade</Link> for unlimited access.
          </p>
        </div>
    </div>
  )
}
