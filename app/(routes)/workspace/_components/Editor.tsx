'use client'

import React, {useEffect} from 'react'
// @ts-ignore
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';

const rawDocument = {
    "time": 1550476186479,
    "blocks" : [
        {
            type: 'header',
            data: {
                "text" : "Welcome to your new workspace 🚀 ",
                "level" : 2
            },
            id: '123',
        },
        {
            type: 'header',
            data: {
                "level" : 4
            },
            id: '123',
        }
    ],
    "version" : "2.8.1"
}

export const Editor = () => {
    const [document, setDocument] = React.useState(rawDocument);
    const ref = React.useRef<EditorJS>()
    useEffect(() => {
        initializeEditor()
    })

    const initializeEditor = () => {

        const editor = new EditorJS({
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+H',
                    config: {
                      placeholder: 'Type your notes or document here --- Style with markdown or shortcuts (Ctrl/)',
                      levels: [2, 3, 4],
                      defaultLevel: 3
                    }
                },
                list: {
                    class: List,
                    shortcut: 'CMD+L',
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    // config: {
                    //   endpoints: {
                    //     byFile: 'http://localhost:3000/workspace/jd7ftd7rf7bcfqa0n2ez0c9ry96pz2bb', // Your backend file uploader endpoint
                    //     byUrl: 'http://localhost:3000/workspace/jd74jdgppbtcaadqczsz3dfmjh6pm008', // Your endpoint that provides uploading by Url
                    //   }
                    // }
                },
            },
            holder: 'editorjs',
            data:document
        });

        ref.current = editor
    }
  return (
    <div>
        <div id='editorjs' className='sm:m-8'></div>
        {/* <div id='editorjs' className='m-8 '></div> */}
    </div>
  )
}
