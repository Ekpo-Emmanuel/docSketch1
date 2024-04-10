'use client';

import React, { useEffect, useState, useContext } from "react";
import SideNav from "../dashboard/_components/_sideNav/SideNav";
import TeamBody from "./_components/Teambody";
import { FileListContext } from "@/app/_context/FIleListContent";


export default function page() {
  // const [ fileList_, setFileList_ ]: any = useContext(FileListContext);
  return (
    <>

      {/* <SideNav /> */}
      <div className='sm:ml-64'>
        <div className='p-4'>
          <TeamBody />
        </div>
      </div>
    </>
  ) ;
}