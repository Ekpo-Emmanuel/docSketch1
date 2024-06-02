import React, { useState, useEffect, useContext } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { FileListContext } from '@/app/_context/FIleListContent';
import { Pen, Copy, Send, Trash2  } from 'lucide-react';
import { RxDotsHorizontal } from "react-icons/rx";
import {useRouter} from "@/node_modules/next/navigation";
import Link from '@/node_modules/next/link';
import moment from 'moment'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


type DataRow = {
    _id: string;
    name: string;
    created_at: string;
    edited_at: string;
    comments: string;
    author: any;
    picture: any;
};
const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            padding: '20px unset',
        },
    },
};

interface CustomTableColumn<DataRow> extends TableColumn<DataRow> {
    cellClass?: string;
  }

const AllFiles: React.FC<{ user: any }> = () => {
    const { fileList_, setFileList_ }: any = useContext(FileListContext);
    const {user}: any = useKindeBrowserClient();
    const [data, setData] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const router = useRouter();

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'NAME',
            cell: (row: DataRow) => {return <Link href={`/workspace/${row._id}`} className="text-[14px] capitalize" >{row.name}</Link>},
            sortable: true,
        },
        {
            name: 'CREATED',
            cell: (row: DataRow) => {
                return <Link href={`/workspace/${row._id}`} className="text-[12px]">{moment(row.created_at).format('DD MMM YY')}</Link> 
            },
            sortable: true,
            // hide: 'md',
            // cellClass: 'hide-on-mobile' as any,
        },
        {
            name: 'EDITED',
            cell: (row: DataRow) => {
                const time = moment(row.created_at).fromNow();
                return (
                    <Link href={`/workspace/${row._id}`} className="text-[12px]">{time}</Link>
                )
            },
            sortable: true,
            // hide: 'md',
            // cellClass: 'hide-on-mobile' as any,
        },
        {
            name: 'AUTHOR',
            cell: (row: DataRow)  => {
                const {user}: any = useKindeBrowserClient();
                return  (
                    <img src={user?.picture} className="rounded-full" width={35} height={35} alt={'author'} onClick={() => router.push(`/workspace/${row._id}`)}/>
                )
            },
            // hide: 'sm',
            // cellClass: 'hide-on-mobile' as any,
        },
        {
            name: <RxDotsHorizontal size={20} />,
            cell: (row: { name: any; }) => {
                    return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='cursor-pointer rounded-sm'>
                                <RxDotsHorizontal size={20} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                                    <div className='flex items-center gap-2'>
                                        <Pen strokeWidth={2} size={11} />
                                        <span className="'text-[12px] font-semibold">Rename</span>
                                    </div>
                                    <p className="text-[11px] opacity-70">Alt ⇧ R</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                                    <div className='flex items-center gap-2'>
                                        <Send 
                                        strokeWidth={2}
                                        size={11}
                                        />
                                        <span className="'text-[12px] font-semibold">Share</span>
                                    </div>
                                    <p className="text-[11px] opacity-70">Ctrl I</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                                    <div className='flex items-center gap-2'>
                                        <Copy 
                                            strokeWidth={2}
                                            size={11}
                                        />
                                        <span className="'text-[12px] font-semibold">Duplicate</span>
                                    </div>
                                    <p className="text-[11px] opacity-70">Ctrl ⇧ D</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                                    <div className='flex items-center gap-2'>
                                        <Pen strokeWidth={2} size={11} />
                                        <span className="'text-[12px] font-semibold">Manage Team</span>
                                    </div>
                                    <p className="text-[11px] opacity-70">Alt ⇧ T</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-end gap-4 justify-between focus:bg-black focus:text-white">
                                    <div className='flex items-center gap-2'>
                                        <Trash2 
                                        strokeWidth={2}
                                        size={11}
                                        />
                                        <span className="'text-[12px] font-semibold">Delete</span>
                                    </div>
                                    <p className="text-[11px] opacity-70">Alt ⇧ W</p>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            right: true,
    
        }
    ];
    

    useEffect(() => {
        setData(fileList_);
    }, [fileList_]);

    // const handleChange = (selectedRows: any) => {
    //     setSelectedRows(selectedRows.selectedRows);
    // };
    const handleChange = ( selectedRows: any ) => {
        setSelectedRows(selectedRows);
    };
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    }
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredData = fileList_.filter((row: DataRow) =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
        setData(filteredData);
    };

    // const handleSort = (column: { cell: any; }, sortDirection: any) => console.log(column.cell, sortDirection);

    const handleFileClick = (filename: string) => {
        const router = useRouter();
        router.push(`/file/view/${filename}`); // Open in a new tab
    };

    // const handleFileClick1 = (filename: string) => {
    //     const router = useRouter();
    //     router.push({
    //         pathname: `/file/view/${filename}`,
    //     }, undefined, { shallow: true });
    // };

    return (
        <div>
            <div className='mb-4'>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="w-full sm:w-[300px] py-[6px] pl-8 pr-4 text-black bg-white border border-gray-200 focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-blue-500 sm:text-sm rounded-md placeholder:text-gray-400 placeholder:text-[12px] focus:black text-[12px] "
                        placeholder="Search or CTRL K"
                        onChange={handleFilter}
                    />
                </div>
            </div>
    
            <DataTable
                // title="All Files"
                columns={columns}
                data={data}
                responsive={true}
                selectableRows
                customStyles={customStyles}
                pagination
                fixedHeader
                // hoverRowColor="#f1f1f1"
                // onSort={handleSort}
                highlightOnHover 
                pointerOnHover
            />
        </div>
    );
};

export default AllFiles;

<style jsx global>{`
    @media (max-width: 768px) {
        .hide-on-mobile {
            display: none;
        }
    }
`}</style>