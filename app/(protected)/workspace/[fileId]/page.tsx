'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import WorkspaceHeader, { LayoutMode } from '../_components/WorkspaceHeader';
import dynamic from 'next/dynamic';
import { DashboardFileListProvider } from '@/app/_context/DashboardFileListContext';
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { getFile } from '../utils/file_utils';
import { Id } from '@/convex/_generated/dataModel';
import { LAYOUT_MODES } from '@/constants/constants';
const Editor = dynamic(
    async () => (await import("../_components/Editor")).default,
    { ssr: false }
);

const CanvasWrapper = dynamic(
    async () => (await import("../_components/CanvasWrapper")).default,
    { ssr: false }
);

const RESIZER_WIDTH = 10; // px
const MIN_PANEL_WIDTH = 300; // Minimum width for both panels in pixels

// Server component
export default function WorkspacePage() {
    const params = useParams();
    const convex = useConvex();
    const fileId = params.fileId;
    const [fileDetails, setFileDetails] = useState<any>(null);
    const [leftPanelWidth, setLeftPanelWidth] = useState<number | null>(null);
    const [isDesktopLayout, setIsDesktopLayout] = useState(() => 
        typeof window !== 'undefined' && window.innerWidth >= 768
    );
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('both');
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const resizerRef = useRef<HTMLDivElement | null>(null);

    // Fetch file details
    useEffect(() => {
        if (fileId) {
            const fetchFileDetails = async () => {
                const file = await getFile(fileId as Id<"files">, convex);
                setFileDetails(file);
            };
            fetchFileDetails();
        }
    }, [fileId, convex]);

    // Handle responsive layout
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const isDesktop = window.innerWidth >= 768;
            setIsDesktopLayout(isDesktop);
            
            // Initialize panel width on desktop
            if (isDesktop && !leftPanelWidth && containerRef.current) {
                setLeftPanelWidth(Math.max(
                    MIN_PANEL_WIDTH,
                    (containerRef.current.offsetWidth - RESIZER_WIDTH) / 2
                ));
            } else if (!isDesktop) {
                setLeftPanelWidth(null);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [leftPanelWidth]);

    // Handle resizing
    const startResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        const startX = e.clientX;
        const startWidth = leftPanelWidth || 0;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        
        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const newWidth = Math.max(MIN_PANEL_WIDTH, startWidth + deltaX);
            
            // Ensure right panel doesn't get too small
            const rightPanelWidth = containerWidth - newWidth - RESIZER_WIDTH;
            if (rightPanelWidth >= MIN_PANEL_WIDTH) {
                setLeftPanelWidth(newWidth);
            } else {
                setLeftPanelWidth(containerWidth - MIN_PANEL_WIDTH - RESIZER_WIDTH);
            }
        };
        
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, [leftPanelWidth]);

    // Grid styles based on layout mode
    const getGridStyle = () => {
        if (!isDesktopLayout) {
            return { display: 'grid' }; // Mobile layout
        }

        switch (layoutMode) {
            case LAYOUT_MODES.EDITOR:
                return { display: 'grid', gridTemplateColumns: '1fr' };
            case LAYOUT_MODES.CANVAS:
                return { display: 'grid', gridTemplateColumns: '1fr' };
            case LAYOUT_MODES.BOTH:
                return leftPanelWidth 
                    ? { display: 'grid', gridTemplateColumns: `${leftPanelWidth}px ${RESIZER_WIDTH}px 1fr` }
                    : { display: 'grid' };
            default:
                return { display: 'grid' };
        }
    };

    // Handle layout mode change
    const handleLayoutChange = (mode: LayoutMode) => {
        setLayoutMode(mode);
    };

    return (
        <DashboardFileListProvider>
            <div id='workspace-container'>
                <WorkspaceHeader 
                    fileName={fileDetails?.fileName}
                    layoutMode={layoutMode}
                    onLayoutChange={handleLayoutChange}
                />
                
                <div
                    ref={containerRef}
                    className={`grid ${!isDesktopLayout ? 'grid-cols-1' : ''}`}
                    style={getGridStyle()}
                >
                    {/* Editor Panel - Hidden in Canvas mode */}
                    {(layoutMode === LAYOUT_MODES.EDITOR || layoutMode === LAYOUT_MODES.BOTH) && (
                        <div className="h-[calc(100vh-3.75rem)] w-full overflow-auto">
                            <Editor
                                fileId={fileId}
                                fileDetails={fileDetails}
                            />
                        </div>
                    )}

                    {/* Resizer - Only shown in Both mode */}
                    {isDesktopLayout && layoutMode === LAYOUT_MODES.BOTH && (
                        <div
                            ref={resizerRef}
                            onMouseDown={startResize}
                            className="bg-gray-700 hover:bg-gray-800 cursor-col-resize"
                            style={{
                                width: `${RESIZER_WIDTH}px`,
                                height: 'calc(100vh - 3.75rem)',
                                zIndex: 10
                            }}
                        />
                    )}

                    {/* Canvas Panel - Hidden in Editor mode */}
                    {(layoutMode === LAYOUT_MODES.CANVAS || layoutMode === LAYOUT_MODES.BOTH) && (
                        <div className="h-[calc(100vh-3.75rem)] w-full overflow-auto">
                            <CanvasWrapper
                                fileId={fileId}
                                fileDetails={fileDetails}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DashboardFileListProvider>
    )
}