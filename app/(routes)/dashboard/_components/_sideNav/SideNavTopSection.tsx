import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Users, Settings, LogOut, Files, FolderPlus, ChevronRight } from 'lucide-react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';
import {useConvex, useQuery } from 'convex/react'
import LoadingAnimation from '@/app/_components/LoadingAnimation';



interface User {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
}

interface Team {
    createdBy: string;
    teamName: string;
    _id: string;
}

interface MenuItem {
    name: string;
    icon: React.ElementType;
    link: string;
}

interface Props {
    user: User;
    setactiveTeamInfo: (teamName: string) => void;
}



export default function SideNavTopSection({ user, setactiveTeamInfo}: any) {
    const convex = useConvex();
    const { email, given_name: firstName, family_name: lastName, picture } = user || {};
    const userEmail = email ? String(email) : '';
    const [teamList, setTeamList] = useState<Team[]>([]);
    const [activeTeam, setactiveTeam] = useState<Team>([]);
    const teams = useQuery(api.teams.getTeam);
    const router = useRouter();



    useEffect(() => {
        if (user && teams) {
          setTeamList(teams);
          setactiveTeam(teams[teams.length - 1]);
        }
      }, [user, teams]);

    useEffect(() => {
        activeTeam && setactiveTeamInfo(activeTeam);
    }, [activeTeam])

  

    // const getTeamList = async () => {
    //     const teamData = await convex.query(api.teams.getTeam);
    //     setTeamList(teamData);
    //     setactiveTeam(teamData[teamData.length - 1]);
    // }

    const onMenuClick = (item: any) => {
        setactiveTeam(item);
    }

    const menu: MenuItem[] = [
        { name: 'Join or Create Team', icon: Users, link: '/teams/create' },
        { name: 'Settings', icon: Settings, link: '/' },
    ];

    const cutWordLength = (str: string | undefined, limit: number) => {
        if (str && str.length > limit) {
            return str.slice(0, limit) + '...';
        }
        return str
    }

    // if (isLoading) return <LoadingAnimation />; 
   
    return (
        <div className=''>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center justify-between cursor-pointer p-2 rounded-sm hover:bg-slate-100 focus:bg-slate-100'>
                        <div className='text-md font-semibold flex items-center gap-2 capitalize'>
                            <img
                                src='https://flowbite.com/docs/images/logo.svg'
                                width={20}
                                height={20}
                                alt='logo'
                            />
                            {cutWordLength(activeTeam?.teamName, 15)}
                        </div>
                        <ChevronDown
                            strokeWidth={2}
                            size={20}
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                    {teamList?.slice().reverse().map((team: Team, index): React.JSX.Element => (
                        <DropdownMenuItem
                            key={index}
                            className={`text-[13px] font-semibold py-[4px] ${activeTeam?._id === team._id ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}
                            onClick={() => setactiveTeam(team)}
                        >
                            {team.teamName}
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='text-[13px] font-semibold py-[4px]'>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem className='text-[13px] py-[4px]'>Email</DropdownMenuItem>
                                    <DropdownMenuItem className='text-[13px] py-[4px]'>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-[13px] py-[4px]'>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        {menu.map((item, index) => (
                            <Link href={item.link} key={index}>
                                <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                                    <item.icon size={16} strokeWidth={1} /> {item.name}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <LogoutLink>
                            <DropdownMenuItem className='text-[13px] font-semibold py-[4px] flex gap-2'>
                                <LogOut size={16} strokeWidth={1} />
                                Logout
                            </DropdownMenuItem>
                        </LogoutLink>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                    <DropdownMenuItem className='flex items-center gap-2'>
                            {picture ? (
                                <Image
                                    src={picture}
                                    alt={firstName}
                                    width={30} height={30}
                                    className='rounded-full'
                                />
                            ) : (
                                <div className='rounded-full h-[34px] w-[34px] bg-black' ></div>

                            )}

                            <div className='flex flex-col line-h--10'>
                                <p className='text-[14px] font-semibold'>{firstName} {lastName}</p>
                                <p className='text-[11px] '>{userEmail}</p>
                            </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className='flex items-center justify-between cursor-pointer py-2 px-4 mt-8 rounded-sm hover:bg-slate-100 '>
                <p className='flex gap-2 align-center items-center text-[14px] font-semibold'>
                    <Files size={16} />All Files
                </p>
                <p className='text-[11px]'>A</p>
            </div>
            <div className='flex items-center justify-between py-2 px-4 mt-4'>
                <p className='flex gap-2 align-center items-center text-[11px] uppercase  cursor-default'>
                    Team Folders
                </p>
                <p className='text-[11px] cursor-pointer hover:font-semibold'>
                    <FolderPlus size={14} strokeWidth={2} />
                </p>
            </div>
            {/* folders */}
            <div className='flex flex-col items-center justify-between cursor-pointer py-1rounded-sm '>
                <div className='text-[13px] pl-4 w-full rounded-sm py-2 text-black hover:bg-slate-100 flex align-center gap-2'>
                    <ChevronRight size={16} strokeWidth={1} />
                    <span>Untitled Folder </span>
                </div>
            </div>
        </div>

    )
}


// export async function getStaticProps(context: { props: { user: { email: string; }; }; }) {
//     const convex = useConvex();
//     const email = context.props.user.email || ''; // Retrieve email dynamically from props
//     const teamData = await convex.query(api.teams.getTeam, { email });
//     return {
//         props: {
//             teamList: teamData || [],
//         },
//     };
// }
