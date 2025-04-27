import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react'
import { ChevronDown, LayoutGrid, LogOut } from 'lucide-react'

// Custom components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator'

// Constants
import { DASHBOARD_SIDEBAR_HEADER_MENU } from '@/constants/constants'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type DashboardSidebarHeaderProps = {
    user: any,
    currentSelectedTeam: any,
    setCurrentSelectedTeam: (team: any) => void,
}

function DashboardSidebarHeader({ 
    user,
    currentSelectedTeam,
    setCurrentSelectedTeam,
} : DashboardSidebarHeaderProps ) {
    const convex = useConvex();

    const [teams, setTeams] = useState<any>([]);

    const getAllTeams = async () => {
        const teams = await convex.query(api.teams.getTeams, { createdBy: user.email });
        setTeams(teams);
        setCurrentSelectedTeam(teams[0]);
    }

    useEffect(() => {
        if (user?.email) {
            getAllTeams();
        }
    }, [user?.email]);

  return (
    <div
        id='dashboard-sidebar-header'
        className='flex flex-col gap-6 items-center'
    >
        <Popover>
        <PopoverTrigger asChild>
        <div
            className='flex items-center justify-center gap-6 py-2 px-4 hover:bg-gray-950 cursor-pointer rounded-lg w-fit mx-auto'
            >
                <Image
                    src='/assets/brainstormer_01.webp'
                    alt='App Icon'
                    width={32}
                    height={32}
                    className='rounded-full'
                />

                <h2 className='flex items-center gap-2 font-bold text-lg text-slate-200'>
                    {currentSelectedTeam?.name}

                    <ChevronDown />
                </h2>
            </div>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-950 py-2 px-4 ml-4 text-amber-100 border-gray-900">
            <div
                className='flex items-center gap-2 p-2'
            >
                {teams.length > 0 && teams.map((team : any) => (
                    <h2
                        key={team._id}
                        className={cn(
                            `w-full font-semibold hover:bg-gray-800 p-2 cursor-pointer rounded-lg
                            ${currentSelectedTeam?._id === team._id && 'bg-sky-600 hover:bg-sky-700'}`
                        )}>
                        {team.name}
                    </h2>
                ))}
            </div>

            <Separator className='mt-3 border-2 border-gray-800'/>

            <div
                className='flex flex-col my-2 gap-1'
            >
                {DASHBOARD_SIDEBAR_HEADER_MENU.map((menuItem) => (
                    <Link
                        href={menuItem.path}
                        key={menuItem.id}
                    >
                        <div
                            className='flex items-center gap-4 p-2 hover:bg-gray-900 cursor-pointer rounded-lg'
                        >
                            <menuItem.icon className='size-5' />
                            <p className='text-sm'>
                                {menuItem.label}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <LogoutLink>
                <div
                    className='flex items-center gap-4 p-2 hover:bg-gray-900 cursor-pointer rounded-lg'
                >
                    <LogOut className='size-5' />
                    <p className='text-sm'>
                        Logout
                    </p>
                </div>
            </LogoutLink>

            <Separator className='mt-3 border-2 border-gray-800'/>

            {user && (
                <div
                    className='flex items-center gap-4 p-2 my-3 flex-wrap cursor-pointer'
                >
                    <Image 
                        src={user.picture}
                        alt='user'
                        width={32}
                        height={32}
                        className='rounded-full'
                    />

                    <div
                        className='flex flex-col gap-1'
                    >
                        <p className='font-bold'>
                            {user.given_name} {user.family_name}
                        </p>

                        <p className='text-slate-300 text-xs'>
                            {user.email}
                        </p>
                    </div>
                </div>
            )}
        </PopoverContent>
        </Popover>

        <Button
            variant='transparent'
            size='lg'
            className='w-[90%] justify-start gap-3 border-2 border-gray-800 mt-6 font-medium text-md'
        >
            <LayoutGrid className='size-8' />
            All files
        </Button>
    </div>
  )
}

export default DashboardSidebarHeader