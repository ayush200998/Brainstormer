'use client'

import React from 'react'
import DashboardMainArea from '../dashboard/_components/DashboardMainArea';
import { DashboardFileListProvider } from '@/app/_context/DashboardFileListContext';

function ArchivePage() {
  return (
    <DashboardFileListProvider>
        <div
            id='archive-page-container'
            className='h-screen w-full flex flex-col'
    >
            <DashboardMainArea />
        </div>
    </DashboardFileListProvider>
  )
}

export default ArchivePage;