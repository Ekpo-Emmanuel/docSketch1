'use client';

import { useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import UnauthorizedRedirect from "@/app/_components/UnauthorizedRedirect";
import Link from "next/link";
import { useRouter } from '@/node_modules/next/navigation';
import { toast  } from "sonner"


export default function page() {
    const [teamName, setTeamName] = useState('');    
    const { user } = useKindeBrowserClient();
    const createTeam = useMutation(api.teams.createTeam); 
    const router = useRouter();

    const createNewTeam = () => {
      createTeam({
          teamName: teamName,
          // createdBy: user?.email
          createdBy: user?.email?? ''
      })
      .then((res: any) => {
        if (res) {
          console.log('New Team created,' + res)
          toast.success('Successfully Created New Team', {
            description: 'Created by ' + user?.email,
          })
          router.push('/dashboard')
        }
      })
      .catch((err:any) => {
        toast.error('Error creating Team. Try again later')
        console.log(err)
      })
    }

    return (
      <section className="items-center justify-center flex w-full h-screen">
        <div className="relative items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              {/* <Link href="/dashboard" className="w-auto px-2 py-1 rounded-full text-sm bg-black/5">
                <span><span className="text-[13px] sm:text-sm font-medium text-blue-600">Go back</span></span>
              </Link> */}
              <p className="mt-8 text-3xl font-extrabold tracking-tight  lg:text-5xl">
                What should we call your team?
              </p>
              <p className="max-w-xl mx-auto mt-2 sm:mt-8 text-base text:md text-gray-500">
              You can always change this later from settings. 
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center max-w-lg mx-auto w-full"
            >
              <div className="flex flex-col w-full gap-3 mx-auto mt-10">
                <input
                  name="text"
                  type="text"
                  className="block w-full px-4 py-4 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-sm font-spline focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 disabled:opacity-50"
                  placeholder={user?.given_name + `'s Team`}
                  onChange={(e) => setTeamName(e.target.value)}
                />

              </div>
            </div>

            <div className="flex flex-col justify-center max-w-sm gap-3 mx-auto mt-10">
                <button 
                  type="submit" 
                  className={teamName.length < 3 ? 
                      "opacity-80 focus:outline-none inline-flex gap-2 items-center text-[14px] text-white justify-center rounded-md bg-blue-700 duration-200  lg:w-auto px-6 py-3 text-center w-full cursor-not-allowed" : 
                      "focus:outline-none inline-flex gap-2 items-center text-[14px] text-white justify-center rounded-md bg-blue-700 duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 lg:w-auto px-6 py-3 text-center w-full"}
                  disabled={!teamName && teamName?.length < 3}
                  onClick={createNewTeam}
                >
                  Continue <HiOutlineArrowNarrowRight />
                </button>
            </div>
            <p className="max-w-xl mx-auto mt-4 text-base text:[14px] text-gray-500">
              {/* Go back */}
              </p>
          </div>
        </div>
      </section>
    ) ;
}
