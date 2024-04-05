
import React, { useContext, useEffect, useState } from 'react'
import DataTable from './data-table'
import { columns } from './columns'
import { FileListContext } from '@/app/_context/FIleListContent'



interface Props {}


const AllFiles2 = (props: Props) => {
    const { fileList_, setFileList_ }: any = useContext(FileListContext);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setData(fileList_);
    }, [fileList_]);


    return (
        <div className="py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default AllFiles2
