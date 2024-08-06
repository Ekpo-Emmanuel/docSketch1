import { createContext } from "react";

interface FileListContextType {
    allFiles: any[];
    nonArchivedFiles: any[];
    setAllFiles: React.Dispatch<React.SetStateAction<any[]>>;
    isSubscribed: boolean;
}

export const FileListContext = createContext<FileListContextType | null>(null);