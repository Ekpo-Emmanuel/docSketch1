import { createContext } from "react";


interface FileListContextType {
    allFiles: any[];
    nonArchivedFiles: any[];
    nonTrashedFiles: any[];
    setAllFiles: React.Dispatch<React.SetStateAction<any[]>>;
    isSubscribed: boolean;
}

export const FileListContext = createContext<any>(null)