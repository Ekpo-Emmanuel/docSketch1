import React from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AllFiles from './AllFiles'
import TopFileNav from './TopFileNav'
import AllFiles2 from './_files/AllFiles2';


export default function GettingStarted() {
  const {user}: any = useKindeBrowserClient();

  return (
    <div>
        {/* <TopFileNav /> */}
        <AllFiles user={user}  />
        {/* <AllFiles2 /> */}
    </div>
  )
}
