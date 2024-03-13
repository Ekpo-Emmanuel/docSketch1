
import SideNavTopSection from './SideNavTopSection';
import SideNavDownSection from './SideNavDownSection';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function SideNav() {
  const { user}: any = useKindeBrowserClient();
  return (
    <div className='h-screen fixed p-6 w-72 border-r bg-white'>
        <SideNavTopSection user={user}/>
        {/* <SideNavDownSection /> */}
        
    </div>
  )
}
