'use client';

import React, { useEffect, useState, useContext } from "react";
// import SideNav from "../dashboard/_components/_sideNav/SideNav";
import SideNav from "@/app/(routes)/dashboard/_components/_sideNav/SideNav";
import TeamBody from "@/app/(routes)/dashboard/teams/_components/TeamBody";


export default function page() {

  return (
    <>

      <div className=''>
        <div className='p-4'>
          <TeamBody />
        </div>
      </div>
    </>
  ) ;
}