import { Button } from "@/components/ui/button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "@/node_modules/next/link";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import LoadingAnimation from "./LoadingAnimation";
import localFont from '@next/font/local';
import { BsStars } from "react-icons/bs";

const myFont1 = localFont({
  src: [
    {
      path: '../../public/fonts/akira/Akira Expanded Demo.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--my-font',
});

export default function Hero() {
  const {user, isLoading} = useKindeBrowserClient();


  return !isLoading ? (
    <div className="">
      <section>
        <div className="h-full px-8 py-24 mx-auto lg:py-32 md:px-12 lg:px-32 max-w-7xl">
          <div className="text-center">
                  <span className="text-sm font-medium flex gap-2 items-center justify-center bg-[#f2f2f2] text-base text-gray-500 w-fit m-auto px-6 py-1 rounded-full ">See what's new  <span className="text-sm font-medium text-blue-600 flex"> <BsStars /> AI Diagram</span></span>
              <p className="text-4xl mt-4 font-bold leading-relaxed tracking-tighter text-gray-800 lg:text-7xl">
              Documents and Diagrams
              <span className="text-blue-500 lg:block">for students and teams</span>
            </p>
            <p className="mt-4 text-base text-gray-500">
            All-in-one markdown editor, collaborative canvas,
              <span className="lg:block">
                {" "}
                and diagram-as-code builder
              </span>
            </p>
            <div className="flex flex-col items-center justify-center gap-3 mt-10 md:flex-row">
              {user ? (
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
              )}
              <a
                className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm text-blue-500 transition-all bg-white border border-gray-300 rounded-lg md:w-auto md:font-semibold hover:text-blue-400"
                href="#_"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  ): <LoadingAnimation />
}
