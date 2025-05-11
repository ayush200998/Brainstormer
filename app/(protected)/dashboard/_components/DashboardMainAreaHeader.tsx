import React, { useCallback, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { useConvex } from 'convex/react';
import { getFileByFileName } from '../../workspace/utils/file_utils';
import { useDashboardFileList } from '@/app/_context/DashboardFileListContext';
import { usePathname } from 'next/navigation';
import { api } from '@/convex/_generated/api';

function DashboardMainAreaHeader() {
    const { user } = useKindeBrowserClient();
    const convex = useConvex();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const {
        files,
        isFetchingFiles,
        setFiles,
        setIsFetchingFiles,
    } = useDashboardFileList();

    const isArchive = pathname === '/archive' || pathname.startsWith('/archive/');

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
            }
        }
        setFiles(files);
    }, [user, convex, isArchive]);

    const handleSearch = async () => {
        try {
            const results = await getFileByFileName(searchQuery, convex);
            console.log('Search results:', results);
            setFiles(results);
        } catch (error) {
            console.error('Error searching for file:', error);
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchQuery) {
                handleSearch();
            } else {
                getAllFiles()
            }
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);


  return (
    <div
        id='dashboard-main-area-header'
        className='w-full pt-4 pr-4 pl-4 flex flex-col'
    >
        <div className='flex justify-end items-center gap-6'>
            <div className='flex items-center gap-1'>
                <div className='relative flex items-center max-w-[400px]'>
                    <Search className='absolute right-2 top-1.5 size-5' />
                    <Input
                        id="search"
                        placeholder='Search...'
                        className='w-[260px]'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {user && user?.picture && (
                    <Image
                        src={user.picture}
                        alt='user'
                        width={32}
                        height={32}
                        className='rounded-full cursor-pointer'
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default DashboardMainAreaHeader