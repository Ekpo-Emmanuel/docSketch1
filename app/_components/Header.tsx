'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "@/node_modules/next/link";
import { buttonVariants } from "@/components/ui/button"




export default function Header() {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className="w-full mx-auto bg-white 2xl:max-w-7xl">
      <div className="relative flex flex-col w-full p-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Eraser.io
            </span>
          </Link>
          <button onClick={toggleOpen} className="inline-flex items-center justify-center p-2  hover:text-black focus:outline-none focus:text-black md:hidden">
          <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path className={open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path className={open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        </div>
        <nav className={`flex-col items-center flex-grow ${open ? 'flex' : 'hidden'} ${!open ? 'hidden' : ''} md:pb-0 md:flex md:justify-end md:flex-row`}>
          <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600 lg:ml-auto" href="#">
            About
          </Link>
          <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600" href="#">
            Contact
          </Link>
          <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600" href="#">
            Documentation
          </Link>
    
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <Link href='/login' className="dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700">
              Log in
            </Link>
            <Link href="/signup">
              <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Get Started</Button>
            </Link>
          </div>
        </nav>
      </div>
      </div>  
    </>          
  )
}
