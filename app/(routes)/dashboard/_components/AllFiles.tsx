import React, {useState} from 'react'
import DataTable, {TableColumn} from 'react-data-table-component';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";



type DataRow = {
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
            fontSize: '10px',
            paddingBottom: '0   px',
        },
    },
    cells: {
        style: {
        },
    },
};
   
const columns: TableColumn<DataRow>[] = [
    {
        name: 'NAME',
        selector: (row: { name: any; }) => row.name,
        sortable: true,
    },
    {
        name: 'CREATED',
        selector: (row: { created_at: any; }) => row.created_at,
        sortable: true,
    },
    {
        name: 'EDITED',
        selector: (row: { edited_at: any; }) => row.edited_at,
        sortable: true,
    },
    {
        name: 'COMMENTS',
        selector: (row: { comments: any; }) => row.comments,
    },
    {
        name: 'AUTHOR',
        selector: (row: { author: any; }) => row.author,
    },
    {
        name: 'PICTURE',
        // cell: (row: { picture: any; }) => <img src={row.picture} alt={row.picture} style={{width: '50px', height: '50px'}}/>
        cell: (row: { picture: any; }) => {
            // console.log('Image URL:', row.picture); // Log the image URL
            return <img src={row.picture} alt={row.picture} style={{width: '50px', height: '50px'}}/>
        }
    }
];



export default function AllFiles({user}: any) {

    const { email, given_name: firstName, family_name: lastName, picture } = user || {};
    const userEmail = email ? String(email) : '';
    // const userEmail = email ? String(email) : '';

    console.log(picture)
    // Entries
const data = [
    {
        id: 1,
        name: 'Emmanuel File',
        created_at: '2022-01-01',
        edited_at: '2022-01-01',
        comments: 'No comments',
        author: 'Emmanuel',
        picture: picture
    },
    {
        id: 2,
        name: 'Emmanuel File',
        created_at: '2022-01-01',
        edited_at: '2022-01-01',
        comments: 'No comments',
        author: 'Emmanuel',
        picture: picture


    },
    {
        id: 3,
        name: 'Emmanuel File',
        created_at: '2022-01-01',
        edited_at: '2022-01-01',
        comments: 'No comments',
        author: 'Emmanuel',
        picture: picture

    },
]

    const [selectedRows, setSelectedRows] = useState([]);
    const [records, setRecords] = useState(data);
    const handleChange = (selectedRows: { selectedRows: any; id: any; }) => {
        const selectedRow = selectedRows.selectedRows;
        setSelectedRows(selectedRow);
        
        console.log('Selected Rows: ', selectedRows);
    };

    const handleFilter = (e: { target: { value: string; }; }) => {
        const filterValue = e.target.value.toLowerCase();
        const newData = data.filter((row) => {
            return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterValue)
            );
        });

        setRecords(newData);
    }


    return (
        <div className='mt-10'>
            <input type={'text'} onChange={handleFilter} />
            <p
                className={selectedRows.length === 0 ? 'text-[13px] font-semibold bg-black text-white p-2 rounded-sm opacity-0' : 'text-[13px] font-semibold bg-black text-white p-2 rounded-sm opacity-100'}
            >
                {selectedRows.length === 0 ? null : `${selectedRows.length} File Selected`}
            </p>
            <DataTable
                columns={columns}
                data={records}
                responsive={true}
                // striped={true}
                selectableRows 
                onSelectedRowsChange={handleChange}
                customStyles={customStyles} 
                pagination
                fixedHeader
                hoverRowColor="#687f11"
            />
        </div>
	);
}
