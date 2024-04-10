import { Button } from "@/components/ui/button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "@/node_modules/next/link";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import LoadingAnimation from "./LoadingAnimation";



export default function Hero() {
  const {user, isLoading} = useKindeBrowserClient();


  return !isLoading ? (
    <>
      <section className="items-center justify-center flex py-24 ">
        <div className="relative items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="w-auto px-6 py-2 rounded-full text-sm bg-black/5">
                <span className="text-sm font-medium">See what's new | <span className="text-sm font-medium text-blue-600">AI Diagram</span></span>
              </span>
              <p className="mt-8 text-3xl font-extrabold tracking-tight  lg:text-6xl">
                Documents & diagrams
                <span className="md:block"> for students and teams</span>
              </p>
              <p className="max-w-xl mx-auto mt-8 text-base text:md lg:text-xl text-gray-500">
                All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
              </p>
            </div>
            <div className="flex flex-col justify-center max-w-sm gap-3 mx-auto mt-10 sm:flex-row">
              {user ? (
                <Link href={"/dashboard"} className="ocus:outline-none inline-flex gap-2 items-center text-white justify-center rounded-md bg-blue-700 duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 lg:w-auto px-6 py-3 text-center w-full">
                  Enter Dashboard <HiOutlineArrowNarrowRight />
                </Link>
              ) : (
                <LoginLink className="ocus:outline-none inline-flex gap-2 items-center text-white justify-center rounded-md bg-blue-700 duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 lg:w-auto px-6 py-3 text-center w-full">
                  Try Eraser <HiOutlineArrowNarrowRight />
                </LoginLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ): <LoadingAnimation />
}
