import React, { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"

// Custom components
import DashboardSidebarFooter from './DashboardSidebarFooter';
import DashboardSidebarHeader from './DashboardSidebarHeader';
import { MenuIcon } from 'lucide-react';

const DashboardSidebar = () => {
    const { user } = useKindeBrowserClient();
    const [currentSelectedTeam, setCurrentSelectedTeam] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar - Hidden on mobile */}
            <div
                id="dashboard-sidebar-desktop"
                className='h-screen w-full p-2 pt-6 justify-between flex-col border-r-2 border-gray-800 hidden md:flex bg-gray-900/40'
            >
                <DashboardSidebarHeader
                    user={user}
                    currentSelectedTeam={currentSelectedTeam}
                    setCurrentSelectedTeam={setCurrentSelectedTeam}
                />

                <div>
                    <DashboardSidebarFooter
                        user={user}
                        currentSelectedTeam={currentSelectedTeam}
                    />
                </div>
            </div>

            {/* Mobile Drawer - Only visible on mobile */}
            <div className="md:hidden fixed z-10 top-4 left-4">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className='h-full bg-gray-900/40 max-w-[280px] border-r border-gray-800'>
                        <div
                            id="dashboard-sidebar-mobile"
                            className='h-screen w-full p-2 pt-6 flex justify-between flex-col'
                        >
                            <DashboardSidebarHeader
                                user={user}
                                currentSelectedTeam={currentSelectedTeam}
                                setCurrentSelectedTeam={setCurrentSelectedTeam}
                            />

                            <div>
                                <DashboardSidebarFooter
                                    user={user}
                                    currentSelectedTeam={currentSelectedTeam}
                                />  
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
};

export default DashboardSidebar;