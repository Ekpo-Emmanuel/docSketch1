'use client'

import React, {useState, useEffect} from 'react'
import { Editor } from '../_components/Editor'
import WorkSpaceHeader from "@/app/(routes)/workspace/_components/WorkSpaceHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useMediaQuery } from 'react-responsive';

export default function Workspace({...props}: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' }); 
  const direction = isSmallScreen ? 'vertical' : props.direction || 'horizontal'; 
  const contentMinSize = isSmallScreen ? 20 : 50;
  const canvasMinSize = isSmallScreen ? 20 : 50;


  return (
    <div className='px-2'>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)}/>

      {/* <div className='grid grid-cols-1 lg:grid-cols-2 mt-3 m-2 rounded-sm'>
        <div className=' h-screen rounded-sm p-2 border b-1'>
          <Editor onSaveTrigger={triggerSave} fileId={params.fileId}/>
        </div>

        <div className=' h-screen rounded-sm p-2 bg-blue-500'>
          Canvas
        </div>
      </div> */}

    <ResizablePanelGroup
      direction={direction} // Use dynamic direction
      className="rounded-lg border min-h-[600px]  rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className=' h-screen rounded-sm p-2 border b-1'>
          <Editor onSaveTrigger={triggerSave} fileId={props.params.fileId}/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={canvasMinSize} minSize={canvasMinSize}>
        <div className="flex h-full">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}
