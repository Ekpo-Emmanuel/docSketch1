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
  const [bothVisible, setBothVisible] = useState(!isSmallScreen);
  const [onlyDocumentVisible, setOnlyDocumentVisible] = useState(isSmallScreen);
  const [onlyCanvasVisible, setOnlyCanvasVisible] = useState(false);
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

  const toggleVisible = () => {
    setBothVisible(true);
    setOnlyDocumentVisible(false);
    setOnlyCanvasVisible(false);
  };

  const showOnlyDocument = () => {
    setBothVisible(false);
    setOnlyDocumentVisible(true);
    setOnlyCanvasVisible(false);
  };

  const showOnlyCanvas = () => {
    setBothVisible(false);
    setOnlyDocumentVisible(false);
    setOnlyCanvasVisible(true);
  };

  return (
    <div className="">
      <div className="">
        <div>
          <WorkSpaceHeader 
            onSave={() => setTriggerSave(!triggerSave)}
            fileName={fileData?.name}
            toggleVisible={toggleVisible}
            showOnlyDocument={showOnlyDocument}
            showOnlyCanvas={showOnlyCanvas}
          />
        </div>
        <section className="pt-[62px] md:pt-0">
          {bothVisible && 
          <div className="hidden lg:inline bg-white h-full">
            <ResizablePanelGroup
              direction={direction}
              className="rounded-lg border min-h-[600px]"
            >
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full rounded-sm px-3">
                  <Editor
                    onSaveTrigger={triggerSave}
                    fileId={params.fileId}
                    fileData={fileData}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={canvasMinSize} minSize={canvasMinSize}>
                <div className="h-full rounded-sm border-l">
                  <Canvas
                    onSaveTrigger={triggerSave}
                    fileId={params.fileId}
                    fileData={fileData}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>}
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
