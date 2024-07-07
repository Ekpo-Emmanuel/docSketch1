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
  Save,
  Files,
  FolderPlus,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  UserPlus,
  ArrowDownToLine,
  Trash,
  LayoutDashboard,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  link: string;
}

interface Props {
  fileId: string;
  fileName: string;
  deleteProject: any;
  renameProject: any;
  onSave: any;
  showOnlyDocument: any;
  showOnlyCanvas: any;
}

export default function WorkSpaceHeader(props: Props) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isRenameDialogInput, setIsRenameDialogInput] = useState<string>("");
  const [activeButton, setActiveButton] = useState("document");

  const menu: MenuItem[] = [
    { name: "Dashboard", icon: Users, link: "/teams/create" },
    { name: "Export", icon: Settings, link: "/" },
  ];

  const toggleDropdown = (fileId: string) => {
    setOpenDropdown(openDropdown === fileId ? null : fileId);
  };

  const handleRenameDialogInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setIsRenameDialogInput(inputValue);
  };

  const handleRenameChangeAfter = () => {
    props.renameProject(props.fileId, isRenameDialogInput)
    setIsRenameDialogInput(''); 
  };

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    if (button === "document") props.showOnlyDocument();
    else if (button === "canvas") props.showOnlyCanvas();
  };

  return (
    <div className="bg-gray-100 p-3 fixed md:relative top-0 w-full z-10">
      <div className="flex gap-2 items-center justify-between">
        <div className="hidden md:flex gap-2 ">
          <h2 className=" font-bold">{props.fileName}</h2>
          <DropdownMenu
            open={openDropdown === props.fileId}
            onOpenChange={() => toggleDropdown(props.fileId)}
          >
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(props.fileId);
                }}
              >
                <MoreHorizontal />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuGroup>
                <Dialog>
                  <div 
                    // asChild 
                    className="hover:bg-gray-50 w-full"
                  >
                    <div 
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      onClick={() => router.push("/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Go to Home
                    </div>
                  </div>
                  <DialogTrigger asChild className="hover:bg-gray-50 w-full">
                    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Rename project</DialogTitle>
                      <DialogDescription>
                        Make changes to your project here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          current
                        </Label>
                        <Input
                          id="name"
                          defaultValue={props.fileName}
                          className="col-span-3"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          New
                        </Label>
                        <Input
                          id="username"
                          className="col-span-3"
                          onChange={handleRenameDialogInputChange}
                          value={isRenameDialogInput}
                        />
                      </div>
                    </div>
                    <DialogFooter onClick={handleRenameChangeAfter} >
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add member
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger className="hover:bg-gray-50 w-full">
                    <div className="text-red-600 relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                      onClick={() => props.deleteProject(props.fileId)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="inline-flex border  w-fit overflow-hidden bg-white divide-x rounded-lg">
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
        <button
          className="hidden px-5 py-2 text-xs font-medium text-white transition-colors duration-200 bg-blue-500 sm:text-sm sm:flex items-center justify-center gap-2 rounded-md"
          onClick={() => props.onSave()}
        >
          <Save size={18} />
          <span>Save</span>
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
