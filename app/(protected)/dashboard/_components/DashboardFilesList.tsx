import dayjs from 'dayjs'
import { useDashboardFileList } from '@/app/_context/DashboardFileListContext';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image';
import { Archive, Edit, FileX, LoaderIcon, MoreHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { archiveFile, unarchiveFile, updateFileName } from '../../workspace/utils/file_utils';
import { Separator } from '@/components/ui/separator';


interface FILE {
    archieve: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    whiteboard: string,
    _id: string,
    _creationTime: number,
};

function DashboardFilesList() {
    const { user } = useKindeBrowserClient();
    const pathname = usePathname();

    const isArchive = pathname === '/archive' || pathname.startsWith('/archive/');

    const convex = useConvex();
    const router = useRouter();
    const {
        files,
        isFetchingFiles,
        setFiles,
        setIsFetchingFiles,
    } = useDashboardFileList();

    const [isEditFileDialogOpen, setIsEditFileDialogOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<FILE | null>(null);

    const getAllFiles = useCallback(async () => {
        let files = [];
        if (user && user?.email) {
            setIsFetchingFiles(true);
            console.log('Fetching all files');
            try{
                files = await convex.query(api.files.getUserFiles, {
                    createdBy: user?.email,
                    archive: isArchive,
                });
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setIsFetchingFiles(false);
            }
        }
        setFiles(files);
    }, [user, convex, isArchive]);

    const handleEditFileDialogClose = () => {
        setIsEditFileDialogOpen(false);
        setCurrentFile(null);
    }

    const handleSingleFileClick = (file: FILE) => {
        const destinationRoute = `/workspace/${file._id}`;
        router.push(destinationRoute);
    }

    // Handle file name update
    const handleSaveFileName = async () => {
        if (currentFile?._id) {
            try {
                await updateFileName(currentFile._id, currentFile.fileName, convex);
                setIsEditFileDialogOpen(false);
                // Wait a little before refreshing to ensure the update completes
                setTimeout(() => {
                    getAllFiles();
                }, 100);
            } catch (error) {
                console.error("Error updating file name:", error);
            }
        }
    };

    // Handle archive/unarchive with refresh
    const handleArchiveToggle = async (fileId: string) => {
        if (isArchive) {
            await unarchiveFile(fileId, convex);
        } else {
            await archiveFile(fileId, convex);
        }
        // Refresh the files list after archiving/unarchiving
        await getAllFiles();
    };

    useEffect(() => {
        if (user?.email) {
            getAllFiles();
        }
    }, [user?.email, getAllFiles]);

    return (
        <div
            id='dashboard-files-list'
            className='overflow-x-auto mt-6'
        >
            {isFetchingFiles ? (
                <div
                    className='h-screen w-full flex justify-center items-center'
                >
                    <LoaderIcon />
                </div>
            ) : (
                files.length > 0 ? (
                    <Table className="min-w-full divide-y-2 divide-gray-800 bg-gray-950 text-sm text-slate-300">
                        <TableHeader className="ltr:text-left rtl:text-right bg-gray-900">
                            <TableRow className="border-gray-800">
                            <TableHead className="whitespace-nowrap px-4 py-2 font-[600] text-left">
                                Name
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-2 font-[600] text-left">
                                Created at
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-2 font-[600] text-left">
                                Last modified
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-2 font-[600] text-left">
                                Author
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-2 font-[600] text-left">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-800">
                        {files.map((file: FILE) => (
                            <TableRow
                                key={file.fileName}
                                className="hover:bg-gray-800 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSingleFileClick(file);
                                }}
                            >
                                <TableCell className="whitespace-nowrap px-4 py-2 font-medium">
                                    {file.fileName}
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-4 py-2 ">
                                    {dayjs(file._creationTime).format('DD MMMM YYYY')}
                                </TableCell>

                                <TableCell className="whitespace-nowrap px-4 py-2 ">
                                    {dayjs(file._creationTime).format('DD MMMM YYYY')}
                                </TableCell>

                                <TableCell className="whitespace-nowrap px-4 py-2 ">
                                    {user && user?.picture && (
                                        <Image
                                            src={user.picture}
                                            alt='user'
                                            width={28}
                                            height={28}
                                            className='rounded-full cursor-pointer ml-5'
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-4 py-2 ">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-gray-900 text-sm border-none text-white'>
                                            <DropdownMenuItem
                                                className='cursor-pointer   flex items-center gap-2 p-2'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCurrentFile(file)
                                                    setIsEditFileDialogOpen(true)
                                                }}
                                            >
                                                <Edit />
                                                Edit
                                            </DropdownMenuItem>

                                            <Separator className='border border-gray-800'/>

                                            <DropdownMenuItem       
                                                className='cursor-pointer flex items-center gap-2 p-2'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleArchiveToggle(file._id);
                                                }}
                                            >
                                                <Archive />
                                                {isArchive ? 'Unarchive' : 'Archive'}
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div
                    className='h-screen w-full flex flex-col justify-center items-center gap-4'
                >
                    <FileX className="h-16 w-16" />
                    <p className=''>
                        {isArchive ? (
                            'Looks like you don\'t have any archived files.'
                        ) : (
                            'Looks like you don\'t have any files.'
                        )}
                    </p>

                    {isArchive && (
                        <Button
                            onClick={() => router.push('/dashboard')}
                        >
                            Go to dashboard
                        </Button>
                    )}
                </div>
            ))}

            <Dialog
                open={isEditFileDialogOpen}
                onOpenChange={handleEditFileDialogClose}
            >
                <DialogContent
                    className="sm:max-w-[425px] bg-gray-900 text-amber-100 border-none"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Edit file 
                        </DialogTitle>
                        <DialogDescription className="text-amber-100/70">
                            Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right text-amber-100">
                                File Name
                            </Label>
                            <Input 
                                id="name" 
                                value={currentFile?.fileName} 
                                className="col-span-3 bg-gray-800 border-gray-700 text-amber-100" 
                                onChange={(e) => setCurrentFile({
                                    ...currentFile,
                                    fileName: e.target.value} as FILE)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSaveFileName}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DashboardFilesList