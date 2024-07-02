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

  return (
    <div className="h-screen">
      <div className="p-3 grid gap-2">
        <div>
          <WorkSpaceHeader 
            onSave = {() => setTriggerSave(!triggerSave)}
            fileName = {fileData?.name} 
          />
        </div>
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
        </div>
      </div>
    </div>
  );
}
