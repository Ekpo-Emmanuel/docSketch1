'use client'

import { useState, useEffect } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "@/node_modules/next/link";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import LoadingAnimation from "./LoadingAnimation";
// import localFont from '@next/font/local';
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button"
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
// import { Label } from "@/components/ui/label"
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast  } from "sonner"
import { Switch } from "@/components/ui/switch"

// const myFont1 = localFont({
//   src: [
//     {
//       path: '../../public/fonts/akira/Akira Expanded Demo.otf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   variable: '--my-font',
// });

export default function Hero() {
  const {user, isLoading} = useKindeBrowserClient();
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


  return !isLoading ? (
    <div className="">
      <section>
        <div className="h-full px-8 py-20 sm:py-24  mx-auto lg:py-32 md:px-12 lg:px-32 max-w-7xl">
          <div className="sm:text-center">
              <span className="text-sm font-medium flex gap-2 items-center justify-center bg-[#f2f2f2] text-gray-500 w-fit m-0 sm:m-auto px-2 sm:px-6 py-1 rounded-full ">See what's new  <span className="text-sm font-medium text-blue-600 flex"> <BsStars /> AI Diagram</span></span>
              <h1 className="text-3xl mt-4 font-semibold sm:font-bold tracking-tighter text-gray-900 lg:text-7xl text-balance">
              Documents and Diagrams
                <span className="text-blue-500"> for students and teams</span>
              </h1>
            <p className="mt-4 text-base text-gray-500">
            All-in-one markdown editor, collaborative canvas,
              <span className="lg:block">
                {" "}
                and diagram-as-code builder
              </span>
            </p>
            <div className="flex flex-col items-center justify-center gap-3 mt-10 md:flex-row">
              {/* {user ? (
                  <Link
                  className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 md:w-auto"
                  href="/dashboard"
                >
                  Enter Dashboard →
                </Link>
                ) : (
                  <LoginLink className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 md:w-auto">
                    Try docSketch Now →
                  </LoginLink>
              )} */}
               
                <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 md:w-auto">
                      Beta Test →
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
                  {/* <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                  <div className="space-y-0.5">
                    <p className="text-sm">Test the beta</p>
                  </div>
                  <div>
                    <Switch
                      // checked={field.value}
                      // onCheckedChange={field.onChange}
                    />
                  </div>
                </div> */}
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <button onClick={handleSubmit} className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all bg-black rounded-lg hover:bg-blue-600 md:w-auto">
                              Join
                          </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
          </div>
        </div>
      </section>
    </div>
  ): <LoadingAnimation />
}
