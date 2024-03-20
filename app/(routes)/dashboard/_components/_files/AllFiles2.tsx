
import React from 'react'
import DataTable from './data-table'
import { columns } from './columns'
import { fakeData } from './data1'



interface Props {}


const AllFiles2 = (props: Props) => {
    return (
        <div className="py-10">
            <DataTable columns={columns} data={fakeData} />
        </div>
    )
}

export default AllFiles2
