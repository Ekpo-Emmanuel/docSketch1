"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Person } from "./data1"
import { ChevronDown, Link, Pen, Copy, Send, Trash2  } from 'lucide-react';
import { RxDotsHorizontal } from "react-icons/rx";

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


export const columns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Created',
    accessorKey: 'created',
    cell: (row: { getValue: (arg: string) => string | number | Date }) => {
      const formattedDate = new Date(row.getValue('edited')).toLocaleString()
      return (
        <p className="text-[12px]">{formattedDate}</p>
      )
    }
  },
  {
    header: 'Edited',
    accessorKey: 'edited',
    cell: (row: { getValue: (arg: string) => string | number | Date }) => {
      const formattedDate = new Date(row.getValue('edited')).toLocaleString()
      return (
        <p className="text-[12px]">{formattedDate}</p>
      )
    }
  },
  {
    header: 'Author',
    accessorKey: 'author',
  },
  {
    accessorKey: "action",
    header: 'Action',
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
                    <div className='flex items-center gap-2' onC4ick={() => navigator.clipboard.writeText(personId)}>
                      <Link strokeWidth={2} size={11} />
                      <span className="text-[13px] font-semibold">Copy Link</span>
                    </div>
                      <p className="text-[11px] opacity-70">Alt ⇧ C</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-4'>
                        <Pen strokeWidth={2} size={11} />
                          <span className="'text-[13px] font-semibold">Rename</span>
                      </div>
                      <p className="text-[11px] opacity-70">Alt ⇧ R</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-4'>
                        <Send 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[13px] font-semibold">Share</span>
                      </div>
                      <p className="text-[11px] opacity-70">Ctrl I</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-4'>
                        <Copy 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[13px] font-semibold">Duplicate</span>
                      </div>
                      <p className="text-[11px] opacity-70">Ctrl ⇧ D</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                      <div className='flex items-center gap-4'>
                        <Trash2 
                          strokeWidth={2}
                          size={11}
                        />
                          <span className="'text-[13px] font-semibold">Delete</span>
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
