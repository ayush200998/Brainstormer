'use client'
import React, { useEffect } from 'react'

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react';
import { redirect } from 'next/navigation';
import DashboardSidebar from './_components/DashboardSidebar';
import { DashboardFileListProvider } from '@/app/_context/DashboardFileListContext';

function DashboardLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
  }>) {
    const {
        user,
    } : any = useKindeBrowserClient();

    const convex = useConvex();

    useEffect(() => {
        if (user) {
            getAllTeams();
        }
    }, [user]);

    // Fetch all teams for user
    const getAllTeams = async () => {
        const teams = await convex.query(api.teams.getTeams, { createdBy: user.email });

        // If user does not have any team redirect him to create teams page
        if (!teams.length) {
            redirect('/teams/create');
        }
    }

    return (
        <div className='h-screen overflow-y-hidden'>
            <DashboardFileListProvider>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='min-w-60'>
                        <DashboardSidebar />
                    </div>

                    <div className='col-span-3 ml-2 sm:ml-8'>
                        {children}
                    </div>
                </div>
            </DashboardFileListProvider>
        </div>
  )
}

export default DashboardLayout