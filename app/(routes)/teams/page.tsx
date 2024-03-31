'use client';

import SideNav from "../dashboard/_components/_sideNav/SideNav";
import TeamBody from "./_components/Teambody";

export default function page() {
  return (
    <>
      <SideNav />
      <div className='sm:ml-64'>
        <div className='p-4'>
          <TeamBody />
        </div>
      </div>
    </>
  ) ;
}