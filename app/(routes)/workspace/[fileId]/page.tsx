"use client";

import React, { useState, useEffect, useContext } from "react";
import { Editor } from "../_components/Editor";
import WorkSpaceHeader from "@/app/(routes)/workspace/_components/WorkSpaceHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "react-responsive";
import { File } from "../../dashboard/_components/_fileDisplay/File1";
import Canvas from "../_components/Canvas";
import MyCustomAutoFocusPlugin from "../_components/LexicalEditor";
import { FileListContext } from "@/app/_context/FIleListContent";
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function Workspace({ params }: any) {
  // const { allFiles, setAllFiles } = useContext(FileListContext);
  // const [fileList, setFileList] = useState<any>();
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<File | any>();
  const [onlyDocumentVisible, setOnlyDocumentVisible] = useState(true);
  const [onlyCanvasVisible, setOnlyCanvasVisible] = useState(false);
  const convex = useConvex();
  const router = useRouter();
  const deleteFilesMutation = useMutation(api.files.deleteFilesById);
  const renameFilesMutation = useMutation(api.files.renameFile);

  useEffect(() => {
    if (params.fileId) {
      getFileData();
    }
  }, [params.fileId]);

  const getFileData = async () => {
    try {
      const result = await convex.query(api.files.getFileById, {
        _id: params.fileId,
      });
      setFileData(result);
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };

  const showOnlyDocument = () => {
    setOnlyDocumentVisible(true);
    setOnlyCanvasVisible(false);
  };

  const showOnlyCanvas = () => {
    setOnlyDocumentVisible(false);
    setOnlyCanvasVisible(true);
  };

  const deleteProject = async (fileId: any) => {
    try {
      console.log("File deleted");
      await deleteFilesMutation({ fileId: fileId });
      // const updatedFileList = fileList.filter(
      //   (file: any) => file._id !== fileId
      // );
      // setFileList(updatedFileList);
      // setAllFiles(updatedFileList);

      router.push("/dashboard");
      toast.success("File Deleted Successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const renameProject = async (fileId: any, fileName: string) => {
    try {
      await renameFilesMutation({ _id: fileId, name: fileName });
      
    //   const updatedFileList = fileList.map((file: any) =>
    //     file._id === fileId ? { ...file, name: fileName } : file
    // );

    // setFileList(updatedFileList);
      // setAllFiles(updatedFileList);
      
      toast.success("File Renamed Successfully");
      console.log("New File Created", fileName);
    } catch (error) {
      console.log("Error renaming project", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <div>
          <WorkSpaceHeader
            fileId={fileData?._id}
            fileName={fileData?.name}
            // fileList={fileList}
            deleteProject={deleteProject}
            renameProject={renameProject}
            onSave={() => setTriggerSave(!triggerSave)}
            showOnlyDocument={showOnlyDocument}
            showOnlyCanvas={showOnlyCanvas}
          />
        </div>
        <section className="pt-[62px] md:pt-0">
          {onlyDocumentVisible && 
            <div className="h-screen rounded-sm px-3">
              <Editor
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>}
          {onlyCanvasVisible && 
            <div className="h-full rounded-sm border-l ">
              <Canvas
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>}
        </section>
      </div>
    </div>
  );
}
