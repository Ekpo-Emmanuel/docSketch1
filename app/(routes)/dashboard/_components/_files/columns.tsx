"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Person } from "./data1"
import {Link, Pen, Copy, Send, Trash2  } from 'lucide-react';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { RxDotsHorizontal } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox"


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

import { Button } from "@/components/ui/button"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";



export const columns: ColumnDef<Person>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[10px] text-black flex items-center gap-2 cursor-pointer hover:font-semibold" 
        >
          NAME
          <ArrowUpDown size={11} strokeWidth={1} />
        </p>
      )
    },
  },
  {
    // header: 'Created',
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[10px] text-black flex items-center gap-2 cursor-pointer hover:font-semibold" 
        >
          CREATED
          <ArrowUpDown size={11} strokeWidth={1} />
        </p>
      )
    },
    accessorKey: 'created',
    cell: (row: { getValue: (arg: string) => string | number | Date }) => {
      const date = new Date(row.getValue('edited'));
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;
      return (
          <p className="text-[12px]">{formattedDate}</p>
      );
    }
  },
  {
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[10px] text-black flex items-center gap-2 cursor-pointer hover:font-semibold" 
        >
          EDITED
          <ArrowUpDown size={11} strokeWidth={1} />
        </p>
      )
    },
    accessorKey: 'edited',
    cell: (row: { getValue: (arg: string) => string | number | Date }) => {
      const date = new Date(row.getValue('edited'));
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;
      return (
          <p className="text-[12px]">{formattedDate}</p>
      );
    }
  },
  {
    header: () => <p className="text-[10px] text-black">AUTHOR</p>,
    accessorKey: 'author',
  },
  {
    accessorKey: "action",
    // header: 'Action',
    header: () => <p className="text-[10px] text-black"><RxDotsHorizontal size={20} /></p>,
    cell: ({ row }) => {
      const person = row.original
      const personId = person.id
 
      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <div className='cursor-pointer rounded-sm'>
                <RxDotsHorizontal size={20} />
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                    <div className='flex items-center gap-2' onClick={() => navigator.clipboard.writeText(personId)}>
                      <Link strokeWidth={2} size={11} />
                      <span className="text-[12px] font-semibold">Copy Link</span>
                    </div>
                      <p className="text-[11px] opacity-70">Alt ⇧ C</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-2'>
                        <Pen strokeWidth={2} size={11} />
                          <span className="'text-[12px] font-semibold">Rename</span>
                      </div>
                      <p className="text-[11px] opacity-70">Alt ⇧ R</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-2'>
                        <Send 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[12px] font-semibold">Share</span>
                      </div>
                      <p className="text-[11px] opacity-70">Ctrl I</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-2'>
                        <Copy 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[12px] font-semibold">Duplicate</span>
                      </div>
                      <p className="text-[11px] opacity-70">Ctrl ⇧ D</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-2'>
                        <Trash2 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[12px] font-semibold">Delete</span>
                      </div>
                      <p className="text-[11px] opacity-70">Alt ⇧ W</p>
                  </DropdownMenuItem>
              </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> 
      </>
      )
    }
  },
]
