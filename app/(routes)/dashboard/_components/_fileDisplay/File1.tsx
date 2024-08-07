"use client";

import React, { useState, useEffect, useContext } from "react";
import TableTitle from "./TableTitle";
import TablePagination from "./TablePagination";
import TableHeader from "./_table/TableHeader";
import TableBody from "./_table/TableBody";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FIleListContent";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import EmptyTable from "./_table/_empty/EmptyTable";
import EmptyArchive from "./_table/_empty/EmptyArchive";
import EmptyTrash from "./_table/_empty/EmptyTrash";
import NotFound from "./_table/NotFound";

export interface File {
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

export default function File1() {
  const { allFiles, setAllFiles, nonArchivedFiles } = useContext(FileListContext);

  const [currentTab, setCurrentTab] = useState('all');
  const [displayedFiles, setDisplayedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Mutations
  const deleteFilesMutation = useMutation(api.files.deleteFilesById);
  const renameFilesMutation = useMutation(api.files.renameFile);
  const archiveFileMutation = useMutation(api.files.archiveFile);
  const unarchiveFileMutation = useMutation(api.files.unarchiveFile);
  const addToTrashMutation = useMutation(api.files.trashProject);
  const untrashProjectMutation = useMutation(api.files.untrashProject);

  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    handleTabChange(currentTab);
  }, [allFiles, currentTab]);

  useEffect(() => {
    const filteredFiles = filterFiles(nonArchivedFiles, searchQuery);
    setDisplayedFiles(filteredFiles);
  }, [nonArchivedFiles, searchQuery]);

  useEffect(() => {
    setTotalPages(Math.ceil(displayedFiles.length / filesPerPage));
  }, [displayedFiles, filesPerPage]);

  const filterFiles = (files: File[], query: string) => {
    if (!query) return files;
    return files.filter(file =>
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const paginatedFiles = displayedFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  const onProjectCreate = (name: string) => {
    console.log("New File Created", name);
  };

  const searchForProject = (query: string) => {
    setSearchQuery(query);
    const filteredFiles = filterFiles(displayedFiles, query);
    setDisplayedFiles(filteredFiles);
    setCurrentPage(1);
  };

  const deleteProject = async (fileId: any) => {
    try {
      await deleteFilesMutation({ fileId: fileId });
      const updatedAllFiles = allFiles.filter((file: { _id: any; }) => file._id !== fileId);
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab);
      toast.success('File Deleted Successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const renameProject = async (fileId: any, fileName: string) => {
    try {
      await renameFilesMutation({ _id: fileId, name: fileName });
      const updatedAllFiles = allFiles.map((file: { _id: any; }) => 
        file._id === fileId ? { ...file, name: fileName } : file
      );
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab);
      toast.success('File Renamed Successfully');
    } catch (error) {
      console.log('Error renaming project', error);
    }
  };

  const archiveProject = async (fileId: any) => {
    try {
      await archiveFileMutation({ _id: fileId, archive: true });
      const updatedAllFiles = allFiles.map((file: { _id: any; }) =>
        file._id === fileId ? { ...file, archive: true } : file
      );
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab);
      toast.success('File Archived Successfully');
    } catch (error) {
      console.log('Error archiving project', error);
    }
  };

  const handleUnarchive = async (fileId: any) => {
    try {
      await unarchiveFileMutation({ _id: fileId, archive: false });
      const updatedAllFiles = allFiles.map((file: { _id: any; }) => 
        file._id === fileId ? { ...file, archive: false } : file
      );
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab);
      toast.success('File Unarchived Successfully');
    } catch (error) {
      console.log('Error unarchiving project', error);
    }
  };

  const handleTrash = async (fileId: any) => {
    try {
      await addToTrashMutation({ _id: fileId, trash: true });
      const updatedAllFiles = allFiles.map((file: { _id: any; }) => 
        file._id === fileId ? { ...file, trash: true } : file
      );
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab);
      toast.success('Moved to Trash Successfully');
    } catch (error) {
      console.log('Error moving project to trash', error);
    }
  };

  const handleUnTrash = async (fileId: any) => {
    try {
      await untrashProjectMutation({ _id: fileId, trash: false });
      const updatedAllFiles = allFiles.map((file: { _id: any; }) => 
        file._id === fileId ? { ...file, trash: false } : file
      );
      setAllFiles(updatedAllFiles);
      handleTabChange(currentTab); 
      toast.success('File Restored Successfully');
    } catch (error) {
      console.log('Error restoring project from trash', error);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    const filteredFiles = filterFiles(allFiles, searchQuery).filter(file => {
      switch (tab) {
        case 'all':
          return !file.archive && !file.trash;
        case 'archive':
          return file.archive && !file.trash;
        case 'trash':
          return file.trash;
        default:
          return true;
      }
    });
    setDisplayedFiles(filteredFiles);
    setCurrentPage(1); 
  };

  return (
    <section className="container px-4 mx-auto">
      <TableTitle 
        onProjectCreate={onProjectCreate} 
        fileList={allFiles.length} 
        onSearch={searchForProject}
        onTabChange={handleTabChange}
      />
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              style={{ overflowY: "auto", maxHeight: "550px" }}
            > 
              {paginatedFiles.length > 0 ? (
                <table className="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHeader />
                  <TableBody 
                    fileList={paginatedFiles}
                    deleteProject={deleteProject}
                    renameProject={renameProject}
                    archiveProject={archiveProject}
                    handleUnarchive={handleUnarchive}
                    trashProject={handleTrash}
                    unTrashProject={handleUnTrash}
                    currentTab={currentTab}
                  />
                </table>
              ) : currentTab === 'trash' ? (
                <EmptyTrash />
              ) : currentTab === 'archive' ? (
                <EmptyArchive />
              ) : searchQuery ? (
                <NotFound />
              ) : (
                <EmptyTable />
              )}
            </div>
          </div>
        </div>
      </div>
      <TablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </section>
  );
}