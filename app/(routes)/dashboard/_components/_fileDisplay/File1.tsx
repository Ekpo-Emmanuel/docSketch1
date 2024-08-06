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

export default function File1() {
  //functions: (search), (create project), export table, (getFiles), pagnition, Edits (Rename, Delete, Share, Add to Team, archieve),
  const { allFiles, nonArchivedFiles, setAllFiles, isSubscribed } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const [displayedFiles, setDisplayedFiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const deleteFilesMutation = useMutation(api.files.deleteFilesById);
  const renameFilesMutation = useMutation(api.files.renameFile);
  const achiveFileMutation = useMutation(api.files.archiveFile);

  useEffect(() => {
    if (nonArchivedFiles) {
      setFileList(nonArchivedFiles);
      setDisplayedFiles(nonArchivedFiles);
    }
  }, [nonArchivedFiles]);

  console.log("FileList", fileList);
  //Create Project
  const onProjectCreate = (name: string) => {
    console.log("New File Created", name);
  }
  
  const searchForProject = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredFiles = nonArchivedFiles.filter((file: File) =>
        file?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedFiles(filteredFiles);
    } else {
      setDisplayedFiles(nonArchivedFiles);
    }
  };

  const deleteProject = async (fileId: any) => {
    try {
      await deleteFilesMutation({ fileId: fileId });
      const updatedAllFiles = allFiles.filter((file: any) => file._id !== fileId);
      setAllFiles(updatedAllFiles);
      toast.success('File Deleted Successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  const renameProject = async (fileId: any, fileName: string) => {
    try {
      await renameFilesMutation({ _id: fileId, name: fileName });
      const updatedAllFiles = allFiles.map((file: any) => 
        file._id === fileId ? { ...file, name: fileName } : file
      );
      setAllFiles(updatedAllFiles);
      toast.success('File Renamed Successfully');
    } catch (error) {
      console.log('Error renaming project', error);
    }
  };

  const archiveProject = async (fileID: any) => {
    try {
      await achiveFileMutation({ _id: fileID, archieve: true });
      const updatedAllFiles = allFiles.map((file: any) => 
        file._id === fileID ? { ...file, archive: true } : file
      );
      setAllFiles(updatedAllFiles);
      toast.success('File Archived Successfully');
    } catch (error) {
      console.log('Error archiving project', error);
    }
  };

  return (
    <section className="container px-4 mx-auto">
      <TableTitle 
        onProjectCreate={onProjectCreate} 
        fileList={displayedFiles.length} 
        onSearch={searchForProject}
      />
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div
                className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
                style = {{ overflowY: "auto", maxHeight: "550px" }}
              > 
                {displayedFiles && displayedFiles.length > 0 ?  (
                  <table className="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <TableHeader />
                    <TableBody 
                      fileList={displayedFiles}
                      deleteProject = {deleteProject}
                      renameProject = {renameProject}
                      archiveProject = {archiveProject}
                    />
                  </table>
                ) : searchQuery ? <NotFound /> : <EmptyTable />}
              </div>
            </div>
          </div>
        </div>
      <TablePagintion />
    </section>
  );
}
