import React from 'react'
import { Editor } from '../_components/Editor'
import WorkSpaceHeader from '../_components/workSpaceHeader'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Workspace() {
  return (
    <div className='px-2'>
      <WorkSpaceHeader />

      <div className='grid grid-cols-1 lg:grid-cols-2 mt-3 m-2 rounded-sm'>
        <div className=' h-screen rounded-sm p-2 border b-1 pl-10'>
          <Editor />
        </div>

        <div className=' h-screen rounded-sm p-2 bg-blue-500'>
          Canvas
        </div>
      </div>

      {/* <ResizablePanelGroup
        direction="horizontal"
        className="h-screen rounded-lg border "
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-screen ">
              <Editor />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={50} >
          <div className="flex h-full">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup> */}
    </div>
  )
}
