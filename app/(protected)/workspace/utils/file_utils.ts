import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexReactClient } from "convex/react";
import { toast } from "sonner";

export const getFile = async (fileId: Id<"files">, convex: ConvexReactClient) => {
console.log('Fetching file data:', fileId);
try {
    const file = await convex.query(api.files.getFile, { _id: fileId });
    if (file) {
        console.log('File data received');
        return file;
    }
    return {};
} catch (error: any) {
    console.error('[file_utils] Error fetching file:', error.message);
    throw error;
}
};

export const getFileByFileName = async (fileName: string, convex: ConvexReactClient) => {
    try {
        const file = await convex.query(api.files.getFileByFileName, { fileName });
        console.log('File data received:', file);
        return file;
    } catch (error: any) {
        console.error(`[file_utils] Error fetching file by file name: ${fileName}`, error.message);
        throw error;
    }
};

export const updateFileName = async (fileId: string, newFileName: string, convex: ConvexReactClient) => {
    try {
        const updatedFile = await convex.mutation(api.files.updateFileName, { _id: fileId as Id<"files">, fileName: newFileName });
        toast.success('File name updated successfully');
        return updatedFile;
    } catch (error: any) {
        console.error(`[file_utils] Error updating file name: ${fileId}`, error.message);
        throw error;
    }
};

export const archiveFile = async (fileId: string, convex: ConvexReactClient) => {
    try {
        const updatedFile = await convex.mutation(api.files.archiveFile, { _id: fileId as Id<"files"> });
        toast.success('Archived successfully');
        return updatedFile;
    } catch (error: any) {
        console.error(`[file_utils] Error archiving file: ${fileId}`, error.message);
        throw error;
    }
};

export const unarchiveFile = async (fileId: string, convex: ConvexReactClient) => {
    try {
        const updatedFile = await convex.mutation(api.files.unarchiveFile, { _id: fileId as Id<"files"> });
        toast.success('Unarchived successfully');
        return updatedFile;
    } catch (error: any) {
        console.error(`[file_utils] Error unarchiving file: ${fileId}`, error.message);
        throw error;
    }
};



