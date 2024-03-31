import { FiPlus } from "react-icons/fi";
import Link from "@/node_modules/next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react";


export default function TeamContainer() {
    const [isOpen, setIsOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const menu = [
    { title: 'Edit Team',  link: '#' },
    { title: 'Delete Team',  link: '#' },
    { title: 'Leave Team',  link: '#' },
  ]

  return (
    <div className="mt-4">
        <Link href={'/teams/create'} className="flex items-center gap-2 flex-wrap bg-blue-500 text-white px-4 py-1 w-fit rounded-sm text-sm hover:bg-blue-600">
            <FiPlus strokeWidth={3} /> Create New Team 
        </Link>
        <div className="mt-8 flex gap-4">
            {menu.map((item, index) => (
                <div key={index} className="w-full p-2 flex items-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <div className="w-full flex items-center gap-4">
                        <div className="bg-black w-10 h-10 rounded-md flex items-center justify-center text-white"> S </div>
                        <div className="details flex flex-col gap-1">
                            <p className="text-[16px] font-semibold">SG Team1</p>
                            <span className="text-[12px]">04/22/2024</span>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <button 
                        onClick={toggleDropdown} className="flex items-center p-1 rounded-md hover:bg-gray-200">
                            <RxDotsHorizontal />
                        </button>
                        {isOpen && (
                        <div
                            onClick={closeDropdown}
                            className="origin-top-left absolute left-0 transform translate-x-[-85%] mt-2 w-40 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 p-1"
                        >
                            <p className="p-1 text-[12px] font-semibold hover:bg-gray-100 cursor-pointer" > Rename </p>
                            <p className="p-1 text-[12px] font-semibold hover:bg-gray-100 cursor-pointer" > Add Members </p>
                            <span className="p-1 text-[12px] font-semibold hover:bg-gray-100 cursor-pointer text-red-500" > Remove </span>
                        </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
