"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { File } from "../../dashboard/_components/_fileDisplay/File1";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

export const Editor = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: File;
}) => {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);

  const initEditor = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: Paragraph,
        warning: Warning,
      },
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    });
    ref.current = editor;
  }, [fileData]);

  useEffect(() => {
    fileData && initEditor();

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [fileData, initEditor]);

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument(true);
    }
  }, [onSaveTrigger]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      onSaveDocument(false);
    }, 2000); // Auto-save every 2 seconds

    return () => {
      clearInterval(autoSaveInterval);
    };
  }, [fileData, fileId]); 

  const onSaveDocument = async (isManual: boolean) => {
    if (!ref.current) return;

    try {
      const outputData = await ref.current.save();
      await updateDocument({
        _id: fileId,
        document: JSON.stringify(outputData),
      });

      if (isManual) {
        toast.success("Document Saved!");
      }
    } catch (error) {
      toast.error("Server Error!");
    }
  };
  return (
      <div id="editorjs" className="sm:m-8" />
  );
};
