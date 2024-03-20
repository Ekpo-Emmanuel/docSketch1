
import SideNavTopSection from './SideNavTopSection';
import SideNavDownSection from './SideNavDownSection';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function SideNav() {
  const { user}: any = useKindeBrowserClient();
  return (
    <div 
      className="fixed top-0 left-0 z-40 p-4 w-64 h-screen border-r bg-white flex flex-col transition-transform -translate-x-full sm:translate-x-0"
    >
        <SideNavTopSection user={user}/>
        <SideNavDownSection />
    </div>
  )
}
