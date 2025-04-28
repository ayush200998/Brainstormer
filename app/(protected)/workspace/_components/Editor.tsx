'use client';

import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import RawTool from '@editorjs/raw';
import SimpleImage from "@editorjs/simple-image";
import List from '@editorjs/list';
import type { ToolConstructable } from '@editorjs/editorjs';
import type { LogLevels } from '@editorjs/editorjs';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Loader from '@/components/loader';
import { getFile } from '../utils/file_utils';

// Simple global registry for editor instances
let editorInstance = null;

function Editor({ fileId, fileDetails }: { fileId: any, fileDetails: any }) {
  const editorRef = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const convex = useConvex();
  const [editorData, setEditorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Save data function
  const handleSave = async (data: any) => {
    console.log('[Editor] Saving data');
    try {
      const response = await convex.mutation(api.files.updateFileDocument, {
        _id: fileId,
        document: JSON.stringify(data),
      });
      setEditorData(JSON.parse(response.document));
    } catch (error) {
      console.error('[Editor] Error saving data:', error);
    }
  };

  // Initialize editor
  async function initEditor() {
    console.log('[Editor] Initializing editor...');
    setLoading(true);

    // Destroy previous instance if it exists
    if (editorRef.current) {
      console.log('[Editor] Destroying previous instance');
      try {
        await editorRef.current.isReady;
        await editorRef.current.destroy();
        editorRef.current = null;
      } catch (e) {
        console.error('[Editor] Error destroying:', e);
      }
    }

    // Check for container
    if (!containerRef.current) {
      console.error('[Editor] Container ref is null');
      setLoading(false);
      return;
    }

    try {
      // Get file data
      const fileData = await getFile(fileId, convex);
      const editorData = fileData?.document ? JSON.parse(fileData.document) : {};
      console.log('[Editor] Creating new editor instance with data:', editorData);
      
      // Create new instance
      const editor = new EditorJS({
        holder: containerRef.current,
        autofocus: true,
        placeholder: 'Start typing your content here...',
        inlineToolbar: true,
        data: editorData,
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+H',
          },
          list: {
            class: List as unknown as ToolConstructable,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
          },
          embed: {
            class: Embed as unknown as ToolConstructable,
            shortcut: 'CMD+SHIFT+E',
          },
          paragraph: {
            class: Paragraph as unknown as ToolConstructable,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+P',
          },
          quote: {
            class: Quote as unknown as ToolConstructable,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+Q',
          },
          image: {
            class: SimpleImage as unknown as ToolConstructable,
            shortcut: 'CMD+SHIFT+I',
          },
          raw: {
            class: RawTool as unknown as ToolConstructable,
            shortcut: 'CMD+SHIFT+R',
          },
        },
        onChange: () => {
          if (editorRef.current) {
            editorRef.current.save().then(data => {
              handleSave(data);
            });
          }
        },
        onReady: () => {
          console.log('[Editor] Editor is ready');
          setLoading(false);
        },
        logLevel: 'ERROR' as LogLevels
      });

      editorRef.current = editor;
      
      console.log('[Editor] Editor instance created and stored in ref');
    } catch (error) {
      console.error('[Editor] Error initializing editor:', error);
      setLoading(false);
    }
  }

  // Init editor on mount
  useEffect(() => {
    console.log('[Editor] Component mounted with fileId:', fileId);
    initEditor();

    // Cleanup on unmount
    return () => {
      console.log('[Editor] Component unmounting, cleaning up');
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (e) {
          console.error('[Editor] Error during cleanup:', e);
        }
        editorRef.current = null;
        editorInstance = null;
      }
    };
  }, [fileId]); // Reinitialize when fileId changes

  return (
    <div className="h-full w-full">
      {loading && (
        <div className="h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <Loader />
        </div>
      )}
      <div 
        ref={containerRef}
        className="h-full border border-gray-800 rounded-md p-2 pl-6 overflow-y-auto"
      />
    </div>
  );
}

export default Editor;