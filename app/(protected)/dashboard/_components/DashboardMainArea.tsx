import React from 'react'

// Custom Components
import DashboardMainAreaHeader from './DashboardMainAreaHeader'
import { Separator } from '@/components/ui/separator'
import DashboardFilesList from './DashboardFilesList'

function DashboardMainArea() {
  return (
    <div
        id='dashboard-main-area'
        className='h-screen w-full flex flex-col'
    >
        <DashboardMainAreaHeader />

        <Separator className='mt-3 border-2 border-gray-900'/>

        <DashboardFilesList />
    </div>
  )
}

export default DashboardMainArea