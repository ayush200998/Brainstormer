import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardFileListContextProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  isFetchingFiles: boolean;
  setIsFetchingFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardFileListContext = createContext<DashboardFileListContextProps | undefined>(undefined);

export const DashboardFileListProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isFetchingFiles, setIsFetchingFiles] = useState(true);

  return (
    <DashboardFileListContext.Provider value={{
      files,
      isFetchingFiles,
      setFiles,
      setIsFetchingFiles,
    }}>
      {children}
    </DashboardFileListContext.Provider>
  );
};

export const useDashboardFileList = () => {
  const context = useContext(DashboardFileListContext);
  if (!context) {
    throw new Error('useDashboardFileList must be used within a DashboardFileListProvider');
  }
  return context;
};

