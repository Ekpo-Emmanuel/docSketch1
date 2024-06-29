"use client"

import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, UserPlus } from "lucide-react"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";


interface File {
  archive: boolean;
  createdBt: string;
  document: string;
  name: string;
  teamId: string;
  whiteboard: string;
  _creationTime: number;
  _id: string;
}

interface TableBodyProps {
  fileList: File[];
}


export default function TableBody(props: TableBodyProps) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (fileId: string) => {
    setOpenDropdown(openDropdown === fileId ? null : fileId);
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {props.fileList && props.fileList.map((file: File, index: number) => (
            <tr key={index} onClick={() => router.push('/workspace/' + file._id)}>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <div>
                  <h2 className="font-medium text-gray-800 dark:text-white ">
                    {file.name}
                  </h2>
                </div>
              </td>
              <td className="hidden lg:inline-block px-4 py-4 text-sm whitespace-nowrap">
                <div>
                  <h4 className="text-gray-700 dark:text-gray-200">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </h4>
                </div>
              </td>
              <td className="hidden lg:inline-block px-4 py-4 text-sm whitespace-nowrap">
                <div>
                  <h4 className="text-gray-700 dark:text-gray-200">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </h4>
                </div>
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt=""
                  />
                  <img
                    className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt=""
                  />
                  <img
                    className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                    alt=""
                  />
                  <img
                    className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt=""
                  />
                  <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                    +4
                  </p>
                </div>
              </td>
              <td className="hidden lg:block px-4 py-4 text-sm whitespace-nowrap">
                <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                  <div className="bg-blue-500 w-2/3 h-1.5" />
                </div>
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap" onClick={() => console.log('clicked')}>
                <DropdownMenu open={openDropdown === file._id} onOpenChange={() => handleDropdownToggle(file._id)}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDropdownToggle(file._id); }}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add member
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowDownToLine className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
}
