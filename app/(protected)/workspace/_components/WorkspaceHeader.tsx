import { Button } from '@/components/ui/button'
import { Columns, Monitor, PanelLeft, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

export type LayoutMode = 'editor' | 'both' | 'canvas';

interface WorkspaceHeaderProps {
  fileName: string;
  layoutMode?: LayoutMode;
  onLayoutChange?: (mode: LayoutMode) => void;
}

function WorkspaceHeader({ 
  fileName, 
  layoutMode = 'both', 
  onLayoutChange 
}: WorkspaceHeaderProps) {
  const router = useRouter();

  return (
    <div
        id='workspace-header'
        className='p-3 border-b border-gray-800 max-h-[4rem]'
    >
        <div
            className='flex items-center justify-between'
        >
            <div
                className='flex items-center gap-2'
            >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2" 
                  onClick={() => router.push('/dashboard')}
                  aria-label="Go back to dashboard"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Image
                    src='/assets/brainstormer_01.webp'
                    alt='App Icon'
                    width={32}
                    height={32}
                    className='rounded-full'
                />
                <h2>
                    {fileName}
                </h2>
            </div>

            {/* Layout Controls */}
            <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-md">
                <Button 
                  variant="transparent" 
                  size="sm"
                  className={layoutMode === 'editor' ? 'bg-gray-800' : ''}
                  onClick={() => onLayoutChange?.('editor')}
                >
                  <PanelLeft size={16} />
                  Editor
                </Button>
                <Button 
                  variant="transparent" 
                  size="sm"
                  className={layoutMode === 'both' ? 'bg-gray-800' : ''}
                  onClick={() => onLayoutChange?.('both')}
                >
                  <Columns size={16} />
                  Both
                </Button>
                <Button 
                  variant="transparent" 
                  size="sm"
                  className={layoutMode === 'canvas' ? 'bg-gray-800' : ''}
                  onClick={() => onLayoutChange?.('canvas')}
                >
                  <Monitor size={16} />
                  Canvas
                </Button>
            </div>
        </div>
    </div>
  )
}

export default WorkspaceHeader