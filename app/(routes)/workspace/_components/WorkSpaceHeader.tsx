"use client";

import React, { useState } from "react";
import { IoMdShare } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { TbDots } from "react-icons/tb";
import {
  ChevronDown,
  Users,
  Settings,
  LogOut,
  Check,
  Files,
  FolderPlus,
  ChevronRight,
} from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  link: string;
}

interface Props {
  fileName: string;
  onSave: any;
  toggleVisible: any;
  showOnlyDocument: any;
  showOnlyCanvas: any;
}

export default function WorkSpaceHeader(props: Props) {
  const [activeButton, setActiveButton] = useState("both");
  const menu: MenuItem[] = [
    { name: "Dashboard", icon: Users, link: "/teams/create" },
    { name: "Export", icon: Settings, link: "/" },
  ];

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    if (button === "both") props.toggleVisible();
    else if (button === "document") props.showOnlyDocument();
    else if (button === "canvas") props.showOnlyCanvas();
  };

  return (
    <div className="bg-gray-100 p-3 fixed md:relative top-0 w-full z-10">
      <div className="flex gap-2 items-center justify-between">
        <div className="hidden md:flex gap-2 ">
          <h2 className=" font-bold">{props.fileName}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="cursor-pointer hover:bg-slate-300 mt-auto mb-auto">
                {" "}
                <TbDots />{" "}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-[13px] font-semibold py-[4px]">
                    Helop
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="text-[13px] py-[4px]">
                        Send{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[13px] py-[4px]">
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-[13px] py-[4px]">
                        More...
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {menu.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <DropdownMenuItem className="text-[13px] font-semibold py-[4px] flex gap-2">
                      <item.icon size={16} strokeWidth={2} /> {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <LogoutLink>
                  <DropdownMenuItem className="text-[13px] font-semibold py-[4px] flex gap-2">
                    <LogOut size={16} strokeWidth={1} />
                    Logout
                  </DropdownMenuItem>
                </LogoutLink>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="inline-flex border  w-fit overflow-hidden bg-white divide-x rounded-lg">
          <button
            className={`hidden lg:inline px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
              activeButton === "both"
                ? "bg-blue-500 text-white"
                : "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
            }`}
            onClick={() => handleButtonClick("both")}
          >
            Both
          </button>
          <button
            className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
              activeButton === "document"
                ? "bg-blue-500 text-white"
                : "text-gray-600 bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleButtonClick("document")}
          >
            Document
          </button>
          <button
            className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
              activeButton === "canvas"
                ? "bg-blue-500 text-white"
                : "text-gray-600 bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleButtonClick("canvas")}
          >
            Canvas
          </button>
        </div>
        <div></div>
        <button
          className="hidden px-5 py-2 text-xs font-medium text-white transition-colors duration-200 bg-blue-500 sm:text-sm sm:flex items-center justify-center gap-2 rounded-lg"
          onClick={() => props.onSave()}
        >
          <IoSaveSharp />
          <span>Save project</span>
        </button>
        <button
          className="w-8 h-8 font-medium text-black transition-colors duration-200 flex sm:hidden items-center justify-center hover:bg-gray-200 rounded-full"
          onClick={() => props.onSave()}
        >
          <Check size={18} />
        </button>

        {/* <button className='bg-blue-500 text-sm py-[7px] px-4 flex gap-2 items-center text-white rounded-sm hover:bg-black font-semibold'> <IoMdShare  />Share </button> */}
      </div>
    </div>
  );
}
