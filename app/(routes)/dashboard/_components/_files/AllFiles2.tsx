
import React, { useContext, useEffect, useState } from 'react'
import DataTable from './data-table'
import { columns } from './columns'
import { fakeData } from './data1'
import { FileListContext } from '@/app/_context/FIleListContent'



interface Props {

}


const AllFiles2 = (props: Props) => {
    const { fileList_: fileList, setFileList_ }: any = useContext(FileListContext);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Set the data prop to the updated fileList
        setData(fileList);
    }, [fileList]);

    return (
        <div className="py-10">
            {/* <DataTable columns={columns} data={fakeData} /> */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default AllFiles2
