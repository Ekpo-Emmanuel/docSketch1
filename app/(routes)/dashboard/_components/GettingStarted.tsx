import React from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import TopFileNav from './TopFileNav'
import File1 from './_fileDisplay/File1';


export default function GettingStarted() {
  const {user}: any = useKindeBrowserClient();

  return (
    <div>
        {/* <TopFileNav /> */}
        <File1 />
    </div>
  )
}

 