"use client";

import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Pencil,
  Trash,
  ArrowDownToLine,
  UserPlus,
  FolderArchive,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface File {
  archive: boolean;
  trash: boolean;
  createdBy: string;
  document: string;
  name: string;
  teamId: string;
  whiteboard: string;
  _creationTime: number;
  _id: string;
}

interface TableBodyProps {
  fileList: File[];
  renameProject: any;
  archiveProject: any;
  handleUnarchive: any;
  deleteProject: any;
  trashProject: any;
  unTrashProject: any;
  currentTab: string;
}

export default function TableBody(props: TableBodyProps) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isRenameDialogInput, setIsRenameDialogInput] = useState<string>("");

  const toggleDropdown = (fileId: string) => {
    setOpenDropdown(openDropdown === fileId ? null : fileId);
  };

  const truncateString = (inputString: string, maxLength: number) => {
    if (inputString && inputString.length > maxLength) {
      return inputString.slice(0, maxLength) + "...";
    }
    return inputString;
  };

  const handleRenameDialogInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setIsRenameDialogInput(inputValue);
  };

  const filteredFiles = props.fileList.filter(file => {
    if (props.currentTab === 'all') {
      return !file.archive && !file.trash;
    } else if (props.currentTab === 'archived') {
      return file.archive && !file.trash;
    } else if (props.currentTab === 'trashed') {
      return file.trash;
    }
    return true;
  });

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {filteredFiles &&
          filteredFiles.map((file: File) => (
            <tr key={file._id}>
              <td
                className="px-4 py-4 text-sm font-medium whitespace-nowrap cursor-pointer"
                onClick={() => router.push(`/workspace/${file._id}`)}
              >
                <div>
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    {truncateString(file.name, 10)}
                  </h2>
                </div>
              </td>
              <td
                className="hidden lg:inline-block px-4 py-4 text-sm whitespace-nowrap cursor-pointer"
                onClick={() => router.push(`/workspace/${file._id}`)}
              >
                <div>
                  <h4 className="text-gray-700 dark:text-gray-200">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </h4>
                </div>
              </td>
              <td
                className="hidden lg:inline-block px-4 py-4 text-sm whitespace-nowrap cursor-pointer"
                onClick={() => router.push(`/workspace/${file._id}`)}
              >
                <div>
                  <h4 className="text-gray-700 dark:text-gray-200">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </h4>
                </div>
              </td>
              <td
                className="px-4 py-4 text-sm whitespace-nowrap"
                onClick={() => router.push(`/workspace/${file._id}`)}
              >
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
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <DropdownMenu
                  open={openDropdown === file._id}
                  onOpenChange={() => toggleDropdown(file._id)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(file._id);
                      }}
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuGroup>
                      <Dialog>
                        <DialogTrigger
                          asChild
                          className="hover:bg-gray-50 w-full"
                        >
                          {/* <Button variant="outline">Edit Profile</Button> */}
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
                                defaultValue={file.name}
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
                          <DialogFooter
                            onClick={() =>
                              props.renameProject(file._id, isRenameDialogInput)
                            }
                          >
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
                      {!file.archive && !file.trash && (
                        <DropdownMenuItem>
                          <div
                            className="flex w-full text-left"
                            onClick={() => props.archiveProject(file._id)}
                          >
                            <FolderArchive className="w-4 h-4 mr-2" />
                            Archive
                          </div>
                        </DropdownMenuItem>
                      )}
                      {file.archive && !file.trash && (
                        <DropdownMenuItem>
                          <div
                            className="flex w-full"
                            onClick={() => props.handleUnarchive(file._id)}
                          >
                            <FolderArchive className="w-4 h-4 mr-2" />
                            Unarchive
                          </div>
                        </DropdownMenuItem>
                      )}

                      {!file.trash ? (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <div
                              className="flex w-full"
                              onClick={() => props.trashProject(file._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Move to trash
                            </div>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <div
                              className="flex w-full"
                              onClick={() => props.unTrashProject(file._id)}
                            >
                              <FolderArchive className="w-4 h-4 mr-2" />
                              Recover
                            </div>
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger className="hover:bg-gray-50 w-full">
                              <div className="text-red-600 relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete permanently
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => props.deleteProject(file._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
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
