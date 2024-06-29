"use client";

import React, { useState, useEffect, useContext } from "react";
import TableTitle from "./TableTitle";
import TablePagintion from "./TablePagintion";
import TableHeader from "./_table/TableHeader";
import TableBody from "./_table/TableBody";

import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FIleListContent";
import { useRouter } from "@/node_modules/next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import EmptyTable from "./_table/EmptyTable";
import NotFound from "./_table/NotFound";

export interface File {
  archive: boolean;
  createdBt: string;
  document: string;
  name: string;
  teamId: string;
  whiteboard: string;
  _creationTime: number;
  _id: string;
}

interface Team {
  _id: string;
}

export default function File1() {
  //functions: search, create project, export table, getFiles, pagnition
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  //Create Project
  const onProjectCreate = (name: string) => {
    console.log("New File Created", name);
  }

  //Search Project
  const searchForProject = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredFiles = fileList_.filter((file: File) =>
        file?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setFileList(filteredFiles);
    } else {
      setFileList(fileList_);
    }
  }

  return (
    <section className="container px-4 mx-auto">
      <TableTitle 
        onProjectCreate={onProjectCreate} 
        fileList={fileList_.length} 
        onSearch={searchForProject}
      />
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              style={{ overflowY: "auto", maxHeight: "550px" }}
            > 
              {fileList && fileList.length > 0 ? (
                <table className="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHeader />
                  <TableBody fileList={fileList} />
                </table>
              ) : searchQuery ? (
                <NotFound />
              ) : (
                <EmptyTable />
              )}
            </div>
          </div>
        </div>
      </div>
      <TablePagintion />
    </section>
  );
}
