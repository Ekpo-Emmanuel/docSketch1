import React from "react";
import { FolderKey } from 'lucide-react';

export default function EmptyArchive() {
  return (
    <div className="flex items-center mt-6 text-center h-96">
    <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
      <div className="p-3 mx-auto text-red-500 bg-red-100 rounded-full dark:bg-gray-800">
        <FolderKey />
      </div>
      <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
        Archive is Empty
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Files that have been archived will appear here.
      </p>
    </div>
  </div>
  );
}
