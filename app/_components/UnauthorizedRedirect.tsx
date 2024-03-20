import React from 'react'
import Link from '@/node_modules/next/link'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function UnauthorizedRedirect() {
  return (
    <main className="flex items-center justify-center h-screen fixed z-30">
    <div className="px-4 py-16 mx-auto text-center lg:px-8  max-w-7xl sm:px-6 sm:py-24">
        <div className="justify-center w-full text-center lg:p-10 max-auto">
        <div className="justify-center w-full mx-auto">
            <p className="text-5xl tracking-tight text-black  lg:text-8xl">Not Allowed!</p>
            <p className="max-w-xl mx-auto mt-4 text-md tracking-tight text-gray-800">
            You don't have access to this page
            </p>
        </div>
        <div className="flex justify-center gap-3 mt-10 md:flex flex-col md:gap-5">
            <LoginLink className="ocus:outline-none inline-flex gap-2 items-center text-white justify-center rounded-md bg-blue-700 duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 lg:w-auto px-6 py-3 text-center w-full">
                Login to continue
              </LoginLink>
            <Link
                className="inline-flex items-center text-sm font-semibold leading-6 text-black"
                href="/"
            >
            <span> Go Back Home </span>
            </Link>
        </div>
        </div>
    </div>
    </main>
  )
}
