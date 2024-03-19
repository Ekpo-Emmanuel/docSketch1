import React from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AllFiles from './AllFiles'
import TopFileNav from './TopFileNav'


export default function GettingStarted() {
  const {user}: any = useKindeBrowserClient();

  return (
    <div className='px-8'>
        <TopFileNav />
        <AllFiles user={user} />
    </div>
  )
}
