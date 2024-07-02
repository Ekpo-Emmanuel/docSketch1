"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "../_components/Editor";
import WorkSpaceHeader from "@/app/(routes)/workspace/_components/WorkSpaceHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "react-responsive";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { File } from "../../dashboard/_components/_fileDisplay/File1";
import Canvas from "../_components/Canvas";

export default function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<File | any>();
  const [bothVisible, setBothVisible] = useState(true);
  const [onlyDocumentVisible, setOnlyDocumentVisible] = useState(false);
  const [onlyCanvasVisible, setOnlyCanvasVisible] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const direction = isSmallScreen ? 'vertical' : params.direction || 'horizontal';
  const contentMinSize = isSmallScreen ? 20 : 50;
  const canvasMinSize = isSmallScreen ? 20 : 50;
  const convex = useConvex();

  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();
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

  const handleBothVisible = () => {
    setBothVisible(true);
    setOnlyDocumentVisible(true);
    setOnlyCanvasVisible(true);
  };

  const handleOnlyDocumentVisible = () => {
    setBothVisible(false);
    setOnlyDocumentVisible(true);
    setOnlyCanvasVisible(false);

    console.log(onlyCanvasVisible, onlyDocumentVisible, bothVisible);
  };

  const handleOnlyCanvasVisible = () => {
    setBothVisible(false);
    setOnlyDocumentVisible(false);
    setOnlyCanvasVisible(true);
  }

  return (
    <div className="h-screen">
      <div className="p-3 grid gap-2">
        <div>
          <WorkSpaceHeader 
            onSave = {() => setTriggerSave(!triggerSave)}
            fileName = {fileData?.name} 
          />
        </div>
        <div className="inline-flex mx-auto w-fit overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button 
            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            onClick={handleBothVisible}
          >
            Both
          </button>
          <button 
            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            onClick={handleOnlyDocumentVisible}
          >
            Document
          </button>
          <button 
            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            onClick={handleOnlyCanvasVisible}
          >
            Canvas
          </button>
        </div>
        {bothVisible && 
        <div className="bg-white">
          <ResizablePanelGroup
            direction = {direction}
            className="rounded-lg border min-h-[600px]"
          >
            <ResizablePanel defaultSize = {50} minSize = {30}>
              <div className="h-full rounded-sm border b-1">
                <Editor
                  onSaveTrigger = {triggerSave}
                  fileId = {params.fileId}
                  fileData = {fileData}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize = {canvasMinSize} minSize = {canvasMinSize}>
              <div className="h-full rounded-sm border-l">
                <Canvas
                  onSaveTrigger = {triggerSave}
                  fileId = {params.fileId}
                  fileData = {fileData}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>}
        {onlyDocumentVisible && 
          <div className="h-screen rounded-sm border-1 border-t-200 oveflow-hidden max-h-[700px]">
            <Editor
              onSaveTrigger = {triggerSave}
              fileId = {params.fileId}
              fileData = {fileData}
            />
          </div>}
        {onlyCanvasVisible && 
          <div className="h-full rounded-sm border-l ">
            <Canvas
              onSaveTrigger = {triggerSave}
              fileId = {params.fileId}
              fileData = {fileData}
            />
          </div>}
      </div>
    </div>
  );
}
