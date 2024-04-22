import React from 'react'
import Image from 'next/image'
import  gettingStarted from '/public/images/gettingStartedAvatarsDark.png'
import { Send } from 'lucide-react';


export default function Top() {
  return (
    <section className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5'>
        <main className='p-5 sm:p-10 rounded-md flex flex-col justify-between gap-5 bg-[#F9F9F9]'>
          <p className='text-[20px] font-bold'>Docsketch is better with a team</p>
          <Image src={gettingStarted} alt="getting started" height={100} width={100}  />
          <p className='sm:text-[14px]'>Invite your teammates to get the most out of Eraser’s commenting and realtime multiplayer features</p>
          <button className='flex items-center gap-2 bg-blue-500 text-[14px] text-white p-2 px-4 rounded w-fit'><Send size={16} />Invite Team Members</button>
        </main>
        <main className='p-5 sm:p-10 rounded-md flex flex-col justify-between gap-5 bg-[#F9F9F9]'>
          <p className='text-[20px] font-bold'>Tutorials & Qick Tips</p>
          <ul className='underline cursor-pointer sm:text-[14px]'>
            <li>What is docsketch?</li>
            <li>Quickstart</li>
            <li>Use cases</li>
          </ul>
          <button className='flex items-center gap-2 bg-blue-500 text-[14px] text-white p-2 px-4 rounded w-fit'><Send size={16} />Watch walk-through (4mins)</button>
        </main>
      </section>
  )
}
