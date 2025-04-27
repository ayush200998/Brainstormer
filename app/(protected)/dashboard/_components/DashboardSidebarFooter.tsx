import { File } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'

// Custom Components
import { Button } from '@/components/ui/button'
import { DASHBOARD_SIDEBAR_FOOTER_ITEMS } from '@/constants/constants'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Loader from '@/components/loader'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useDashboardFileList } from '@/app/_context/DashboardFileListContext'

type DashboardSidebarFooterProps = {
    user: any,
    currentSelectedTeam: any,
}

function DashboardSidebarFooter({
    user,
    currentSelectedTeam,
} : DashboardSidebarFooterProps) {
    const {
        setFiles,
    } = useDashboardFileList();

    const [pending, startTransition] = useTransition();
    const convex = useConvex();

    const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleCreateFileDialogOpen = () => {
        setIsCreateFileDialogOpen(true);
    }

    const handleCreateFileDialogClose = () => {
        setIsCreateFileDialogOpen(false);
    }

    const handleCreateNewFile = () => {
        startTransition(async () => {
            try {
                const file = await convex.mutation(api.files.createNewFile, {
                    createdBy: user.email,
                    teamId: currentSelectedTeam._id,
                    fileName: fileName,
                    archive: false,
                    document: '',
                    whiteboard: '',
                });
                setFiles((prevState) => ([file, ...prevState]));
                handleCreateFileDialogClose();
            } catch (error) {
                console.error(error);
                toast.error('Failed to create file');
            } finally {
                setFileName('');
                toast('File created successfully');
            }
        })
    }

  return (
    <div
        id='dashboard-sidebar-footer'
        className='flex flex-col p-4'
    >
        <div
            className='flex flex-col my-2 gap-1'
        >
            {DASHBOARD_SIDEBAR_FOOTER_ITEMS.map((menuItem) => (
                <Link
                    href={menuItem.path}
                    key={menuItem.id}
                >
                    <div
                        className='flex items-center gap-2 p-2 hover:bg-gray-900 cursor-pointer rounded-lg'
                    >
                        <menuItem.icon className='size-5' />
                        <p className='text-sm'>
                            {menuItem.label}
                        </p>
                    </div>
                </Link>
            ))}
        </div>


        <Dialog
            open={isCreateFileDialogOpen}
            onOpenChange={handleCreateFileDialogClose}
        >
            <Button
                variant='default'
                size='lg'
                className='w-full max-w-lg mx-auto mt-4 font-semibold'
                onClick={() => handleCreateFileDialogOpen()}
            >
                <File className='font-semibold' />
                New file
            </Button>

            <DialogContent className="sm:max-w-md bg-gray-950 text-white border-2 border-gray-800">
                <DialogHeader>
                    <DialogTitle>Create new file</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor='name' className='text-slate-300'>
                            File name
                        </Label>
                        <Input
                            id="name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="justify-end">
                    <Button
                        variant='default'
                        disabled={!fileName || pending}
                        onClick={() => handleCreateNewFile()}
                    >
                        {pending ? <Loader /> : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default DashboardSidebarFooter