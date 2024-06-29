import React from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AllFiles from './AllFiles'
import TopFileNav from './TopFileNav'
import AllFiles2 from './_files/AllFiles2';
import File1 from './_fileDisplay/File1';


export default function GettingStarted() {
  const {user}: any = useKindeBrowserClient();

  return (
    <div>
        {/* <TopFileNav /> */}
        {/* <AllFiles 
          user={user}         
        /> */}
        <File1 />
    </div>
  )
}

 