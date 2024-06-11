'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "@/node_modules/next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import logo from '../../public/images/logo.svg';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast  } from "sonner"
import { Switch } from "@/components/ui/switch"

export default function Header() {
  const [open, setOpen] = useState(false);
  const {user} = useKindeBrowserClient();

  const toggleOpen = () => {
    setOpen(!open)
  }
  
  const addUserToWaitlist = useMutation(api.waitlist.addUserToWaitlist);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  })

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  const handleSubmit = () => {
    if(formData.email === '' || formData.firstname === '' || formData.lastname === '') {
      toast.error('Please Enter all fields')
      return
    } 
    else {
      addUserToWaitlist({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email
      })
      .then((res: any) => {
        toast.success('Successfully added to waitlist', {
          description: 'by ' + formData.email,
        })
      })
      .catch((err:any) => {
        if (err.message === 'Email already exists in the waitlist.') {
          toast.error('Email already exists in the waitlist');
        } else {
          toast.error('Error adding to waitlist');
          console.log(err);
        }
      })
  
      //empty form after submit
      setFormData({
        firstname: '',
        lastname: '',
        email: ''
      });
    }
  }
  return (
    <>
      <div className="w-full mx-auto bg-white px-8 lg:px-12 sm:px-16 2xl:max-w-7xl">
      <div className="relative flex w-full py-3 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center  justify-between lg:justify-start">
          <Link href="/" className="flex items-center ">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
          {/* <button onClick={toggleOpen} className="inline-flex items-center justify-center p-2  hover:text-black focus:outline-none focus:text-black md:hidden">
          <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path className={open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path className={open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button> */}
        </div>
        {/* <nav className={`flex-col items-center flex-grow ${open ? 'flex' : 'hidden'} ${!open ? 'hidden' : ''} md:pb-0 md:flex md:justify-end md:flex-row`}> */}
        <nav className={`flex-col items-center flex-grow flex `}>
          {/* <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600 lg:ml-auto" href="#">
            About
          </Link> */}
          {/* <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600" href="#features">
            Features
          </Link> */}
          {/* <Link className="px-2 py-2 text-sm lg:px-6 md:px-3 hover:text-blue-600" href="#">
            Contact
          </Link> */}

          {/* {user ? 
            (
              <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
                 <LogoutLink 
                  postLoginRedirectURL="/dashboard"
                  className="dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700">
                  Log out
                </LogoutLink>
                <Link
                  href="/dashboard"
                >
                  <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
                <LoginLink 
                  postLoginRedirectURL="/dashboard"
                  className="dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700">
                  Log in
                </LoginLink>
                <RegisterLink
                  postLoginRedirectURL="/dashboard"
                >
                  <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Get Started</Button>
                </RegisterLink>
              </div>
            )
          } */}
           <div className="inline-flex  ml-auto">
              {/* <Link
                  className="flex items-center justify-center w-full h-8 px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 md:w-auto"
                  href="/dashboard"
                >
                      Join Waitlist
              </Link> */}
              <Dialog>
                <DialogTrigger asChild>
                <button
                          className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm text-blue-500 transition-all bg-white border border-gray-300 rounded-lg md:w-auto md:font-semibold hover:text-blue-400"
                        >
                          Join Waitlist
                        </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join Waitlist</DialogTitle>
                    <DialogDescription>
                      Get notified when we launch.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="sm:flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                      <label htmlFor="link" className="sr-only">
                        firstname
                      </label>
                      <Input
                        id="firstname"
                        placeholder="Firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid flex-1 gap-2 mt-4 sm:mt-0">
                      <label htmlFor="link" className="sr-only">
                        lastname
                      </label>
                      <Input
                        id="lastname"
                        placeholder="Lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="grid flex-1 gap-2">
                      <label htmlFor="link" className="sr-only">
                        Link
                      </label>
                      <Input
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <button onClick={handleSubmit} className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 md:w-auto">
                              Join
                          </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
        </nav>
      </div>
      </div>
    </>          
  )
}
