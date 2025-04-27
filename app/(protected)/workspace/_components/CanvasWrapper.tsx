'use client';

import { useEffect, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Excalidraw, exportToSvg } from "@excalidraw/excalidraw";


import "@excalidraw/excalidraw/index.css";
import { useConvex } from "convex/react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

const ExcalidrawWrapper: React.FC<{ fileId: any, fileDetails: any }> = ({ fileId, fileDetails }) => {
  const convex = useConvex();
  const [canvasData, setCanvasData] = useState<any>([]);
  const excalidrawRef = useRef<ExcalidrawImperativeAPI | null>(null);
  
  // Parse whiteboard data safely
  const getInitialElements = () => {
    try {
      if (fileDetails?.whiteboard) {
        const parsedData = JSON.parse(fileDetails.whiteboard);
        console.log('[CanvasWrapper] Initial elements:', parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error("[CanvasWrapper] Error parsing whiteboard data:", error);
    }
    return []; // Return empty array if parsing fails or no data
  };

  // Update scene with API when component mounts
  useEffect(() => {
    if (excalidrawRef.current && fileDetails?.whiteboard) {
      try {
        const elements = JSON.parse(fileDetails.whiteboard);
        console.log('[CanvasWrapper] Updating scene with API:', elements);
        
        // Use updateScene API to force an update
        excalidrawRef.current.updateScene({
          elements: elements,
        });
      } catch (error) {
        console.error('[CanvasWrapper] Error updating scene:', error);
      }
    }
  }, [excalidrawRef.current, fileDetails]);

  // Save data function
  const handleCanvasDataSave = async (elements: any) => {
    if (!elements || elements.length <= 0) {
      console.log('[CanvasWrapper] No elements to save');
      return;
    }

    console.log('[CanvasWrapper] Saving data...', elements);
    try {
      await convex.mutation(api.files.updateFileCanvas, {
        _id: fileId,
        whiteboard: JSON.stringify(elements),
      });
    } catch (error) {
      console.error('[CanvasWrapper] Error saving data:', error);
    }
  };

  return (
    <div
        id='canvas-wrapper'
        className='h-[calc(100vh-3.75rem)] w-full rounded-lg overflow-hidden custom-styles'
    >
      <Excalidraw
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
          console.log('[CanvasWrapper] API initialized');
        }}
        theme='dark'
        onChange={(elements, appState) => {
          console.log('[CanvasWrapper] onChange triggered', elements.length);
          setCanvasData(elements);
          if (elements.length > 0) {
            handleCanvasDataSave(elements);
          }
        }}
        initialData={{
          elements: getInitialElements(),
        }}
      />
    </div>
  );
};

export default ExcalidrawWrapper;